const dotenv = require('dotenv');
const path = require('path');

// Load environment variables: prefer .env.local, then .env
dotenv.config({ path: path.resolve(__dirname, '.env.local') });
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Accept either UPPERCASE or lowercase key (some env files may use different naming)
const jiralite_MONGODB_URI =
    process.env.JIRALITE_MONGODB_URI || process.env.jiralite_MONGODB_URI || process.env.VITE_JIRALITE_MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Models
const CardSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    status: String
});

const ListSchema = new mongoose.Schema({
    id: String,
    title: String,
    cards: [CardSchema]
});

const BoardSchema = new mongoose.Schema({
    id: String,
    name: String,
    lists: [ListSchema]
});

// Ensure Board is saved in the existing `BOARDS` collection (uppercase) inside `jira_lite` db
// third parameter enforces collection name instead of Mongoose's default pluralization
const Board = mongoose.model('Board', BoardSchema, 'BOARDS');

// Add a User model mapped to the `Users` collection
const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String
});
const User = mongoose.model('User', UserSchema, 'Users');

// Routes
app.get('/boards', async (req, res) => {
    try {
        // prefer returning a plain array of board objects regardless of storage shape
        const coll = mongoose.connection.db.collection('BOARDS');
        // Case A: single document that contains a `boards` array
        const wrapper = await coll.findOne({ boards: { $exists: true } });
        if (wrapper && Array.isArray(wrapper.boards)) {
            return res.json(wrapper.boards);
        }

        // Case B: collection contains individual board documents
        const docs = await coll.find().toArray();
        return res.json(docs);
    } catch (err) {
        console.error('GET /boards error:', err);
        res.status(500).json({ error: 'Failed to fetch boards' });
    }
});

// Return users from the `Users` collection, supporting either a wrapper doc
// shape ({ users: [...] }) or individual user documents.
app.get('/users', async (req, res) => {
    try {
        const coll = mongoose.connection.db.collection('Users');
        // Case A: single document that contains a `users` array
        const wrapper = await coll.findOne({ users: { $exists: true } });
        if (wrapper && Array.isArray(wrapper.users)) {
            return res.json(wrapper.users);
        }

        // Case B: collection contains individual user documents
        const docs = await coll.find().toArray();
        return res.json(docs);
    } catch (err) {
        console.error('GET /users error:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Create a user: append into wrapper's `users` array if present, otherwise
// insert as its own document (keeps compatibility with both shapes).
app.post('/users', async (req, res) => {
    try {
        const coll = mongoose.connection.db.collection('Users');
        const wrapper = await coll.findOne({ users: { $exists: true } });
        const newUser = req.body;
        if (wrapper && Array.isArray(wrapper.users)) {
            await coll.updateOne({ _id: wrapper._id }, { $push: { users: newUser } });
            return res.json(newUser);
        }

        const result = await coll.insertOne(newUser);
        return res.json(newUser);
    } catch (err) {
        console.error('POST /users error:', err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.post('/boards', async (req, res) => {
    try {
        const coll = mongoose.connection.db.collection('BOARDS');
        const wrapper = await coll.findOne({ boards: { $exists: true } });
        const newBoard = req.body;
        if (wrapper && Array.isArray(wrapper.boards)) {
            // push into the existing wrapper document's boards array
            await coll.updateOne({ _id: wrapper._id }, { $push: { boards: newBoard } });
            return res.json(newBoard);
        }

        // Otherwise insert as its own document (legacy shape)
        const result = await coll.insertOne(newBoard);
        return res.json(newBoard);
    } catch (err) {
        console.error('POST /boards error:', err);
        res.status(500).json({ error: 'Failed to create board' });
    }
});

app.put('/boards/:id', async (req, res) => {
    try {
        const coll = mongoose.connection.db.collection('BOARDS');
        const wrapper = await coll.findOne({ boards: { $exists: true } });
        const updated = req.body;
        if (wrapper && Array.isArray(wrapper.boards)) {
            // update the array element with matching id
            const result = await coll.updateOne({ 'boards.id': req.params.id }, { $set: { 'boards.$': updated } });
            if (result.matchedCount === 0) return res.status(404).json({ error: 'Board not found' });
            return res.json(updated);
        }

        // legacy: individual documents
        const result = await coll.findOneAndUpdate({ id: req.params.id }, { $set: updated }, { returnDocument: 'after' });
        if (!result.value) return res.status(404).json({ error: 'Board not found' });
        res.json(result.value);
    } catch (err) {
        console.error('PUT /boards/:id error:', err);
        res.status(500).json({ error: 'Failed to update board' });
    }
});

// Connect to Mongo then start server
// Validate MongoDB URI first
if (!jiralite_MONGODB_URI) {
    console.error(
        'Missing MongoDB URI: set `JIRALITE_MONGODB_URI` or `jiralite_MONGODB_URI` in a `.env`/`.env.local` file or environment variables (see .env.example)'
    );
    process.exit(1);
}
const { MongoClient } = require('mongodb');

// Create a module-scoped MongoClient with options similar to the Vercel example.
let attachDatabasePool;
try {
    ({ attachDatabasePool } = require('@vercel/functions'));
} catch (e) {
    // not running on Vercel or package not installed — that's fine
}

const envMongoUri = process.env.JIRALITE_MONGODB_URI || process.env.jiralite_MONGODB_URI || process.env.MONGODB_URI || process.env.VITE_JIRALITE_MONGODB_URI;

const mongoClientOptions = {
    appName: 'devrel.vercel.integration',
    maxIdleTimeMS: 5000,
};

const moduleClient = new MongoClient(envMongoUri || 'mongodb://127.0.0.1:27017/jiralite', mongoClientOptions);
if (attachDatabasePool) {
    try {
        attachDatabasePool(moduleClient);
    } catch (e) {
        console.warn('attachDatabasePool failed:', e.message || e);
    }
}

(async function start() {
    // Try connecting the native client first (non-fatal if it fails).
    try {
        await moduleClient.connect();
        console.log('MongoClient connected (module client)');
    } catch (err) {
        console.warn('Module MongoClient connection failed, will continue and attempt mongoose connection:', err.message || err);
    }

    // Use the env-provided URI for mongoose if present, otherwise fall back to local.
    const mongooseUri = envMongoUri || 'mongodb://127.0.0.1:27017/jiralite';

    // Force mongoose to use the `jira_lite` database so reads/writes go to that DB
    mongoose.connect(mongooseUri, { dbName: 'jira_lite' })
        .then(() => {
            console.log('MongoDB connected (mongoose)');
            // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch((err) => {
            console.error('MongoDB connection error (mongoose):', err);
            process.exit(1);
        });
})();
module.exports = app;

