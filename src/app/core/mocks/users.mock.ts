import { User } from '../../shared/models/user.model';
// users.mock.ts
export const USERS_MOCK: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin',
    password: 'admin123',
    roles: 'ADMIN'
  },
  {
    id: 'u2',
    name: 'Normal User',
    email: 'user',
    password: 'user123',
    roles: 'USER'
  }
];
