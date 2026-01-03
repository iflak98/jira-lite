# Jira-Lite

A lightweight, modern project management application inspired by Jira. Built with Angular 20, featuring real-time board management, drag-and-drop functionality, and role-based access control.

**Developed by:** Iflak Yousuf Mir

## Overview

Jira-Lite is a simplified project management tool that allows teams to organize and track tasks across different statuses (To Do, In Progress, Done). The application supports multiple user roles with different permission levels, making it suitable for small to medium-sized teams.

### Key Features

- **🎯 Kanban Board**: Organize tasks using the classic kanban board layout with drag-and-drop support
- **👥 Role-Based Access Control**: 
  - **Admin**: Full access to all features and user management
  - **Manager**: Can create, edit, and manage boards and tasks
  - **User**: Can work on assigned tasks
  - **Viewer**: Read-only access (cannot drag or modify tasks)
- **🖱️ Drag & Drop**: Seamlessly move cards between different status columns (non-viewers only)
- **👤 User Management**: Admin and managers can manage user permissions and assignments
- **📊 Task Tracking**: Track task priority (High, Medium, Low) and status
- **🔒 Secure Authentication**: Role-based authentication with mock users for development

### User Roles & Permissions

| Feature        | Admin | Manager | User | Viewer |
|----------------|-------|---------|------|--------|
| View Boards    |  ✅   |    ✅    |  ✅  |   ✅   |
| Create Boards  |  ✅   |    ✅    |  ❌  |   ❌   |
| Edit Tasks     |  ✅   |    ✅    |  ✅  |   ❌   |
| Drag & Drop.   |  ✅   |    ✅    |  ✅  |   ❌   |
| User Management|  ✅   |    ❌    |  ❌  |   ❌   |
| Assign Tasks.  |  ✅   |    ✅    |  ❌  |   ❌   |

## Technology Stack

- **Frontend Framework**: Angular 20+ (Standalone Components)
- **State Management**: Angular Signals & Computed Values
- **Styling**: SCSS with responsive design
- **UI Components**: Angular CDK (Drag & Drop)
- **Authentication**: Custom Auth Service with Role Guards
- **Routing**: Lazy-loaded feature modules with route guards
- **Development**: Angular CLI, TypeScript

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # Auth & Role guards
│   │   ├── services/        # AuthService, BoardService, ActivityService
│   │   └── mocks/           # Mock data (users, boards)
│   ├── features/
│   │   ├── auth/            # Login & authentication
│   │   ├── boards/          # Board view & management
│   │   └── admin/           # User management (admin only)
│   ├── shared/
│   │   ├── models/          # TypeScript interfaces
│   │   └── ui/              # Shared components
│   └── app.routes.ts        # Main routing configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Angular CLI 20+

### Installation

## What’s new / Recent improvements

- **Backend**
  - Switched to dotenv + environment-variable driven configuration and robust MongoDB connection handling.
  - Added module-scoped MongoClient with non-fatal attachment and a resilient mongoose connect (forces `dbName: 'jira_lite'`).
  - `GET /users` now supports two storage shapes: a wrapper document (`{ users: [...] }`) or individual user documents. Also added `POST /users` to append into the wrapper or insert standalone users.
  - Routes for boards are tolerant of two shapes (wrapper doc with `boards` array OR per-document boards).
  - Improved error handling and readiness patterns (recommended to wire health checks to `/healthz`).

- **Frontend**
  - New `UserService` that loads users from backend (`GET /users`) and exposes `users$` + `getUsersSnapshot()` for synchronous lookups.
  - `BoardService` enriched with user data so `Card` objects include `assigneeName` for display while keeping `assigneeId` for permissions.
  - Admin Create Task form (Reactive Forms) that persists tasks and stores both `assigneeId` and `assigneeName` on cards.
  - Replaced many development `USERS_MOCK` usages with DB-driven `UserService` while keeping safe fallbacks.
  - Fixed routing and TypeScript issues (explicit types added where needed to avoid build errors). Added runtime guards to handle null/undefined users.
  - UI/UX tweaks: improved `Create Task` layout, responsive task cards, and user-management task actions (delete, move, priority updates) with icons.

---

| Email | Password | Role |
|-------|----------|------|
| admin | admin123 | Admin |
| pm    | pm123    | Manager |
| user  | user123  | User |
| viewer | viewer123 | Viewer |

**Note:** Click "Show Mock Users" on the login page to see all credentials.

## How It Works

### Authentication Flow

1. User navigates to `/login`
2. Enter credentials (or use mock users table)
3. System validates credentials against mock users
4. On successful login:
   - User data is stored in AuthService
   - User is redirected based on role:
     - Admin/Manager → `/admin` (user management)
     - User/Viewer → `/boards` (board view)

### Board Management

1. **View Boards**: Users see a list of all boards
2. **Select Board**: Click a board to view its tasks
3. **Manage Tasks**: 
   - Admin/Manager/User: Can drag cards between columns
   - Viewer: Can only view (cards appear disabled)
4. **Task Status**: Automatically updates based on column placement

### Role Guards

- `authGuard`: Ensures user is logged in
- `roleGuard`: Checks if user has required role for the route

## Building & Deployment

### Build for Production

```bash
ng build --configuration production
```

Build artifacts will be stored in `dist/` directory.

### Running Tests

```bash
# Unit tests
ng test

# End-to-end tests
ng e2e
```

## Features in Detail

### Drag & Drop
- Smooth card movement between columns
- Visual feedback during dragging
- Automatic status update on drop
- Disabled for Viewer role

### User Management
- Admin-only feature
- View all users and their roles
- Manage user permissions
- Track user activity

### Responsive Design
- Mobile-friendly layout
- Optimized for desktop, tablet, and mobile
- Touch-friendly drag & drop

## Future Enhancements

- Real-time collaboration using WebSockets
- Backend API integration (remove mock data)
- Task filtering and search
- Advanced reporting and analytics
- Custom workflows
- Integration with external tools (Git, Slack, etc.)
- Dark mode support

## Architecture Highlights

### Angular Signals (State Management)
```typescript
boards = signal<Board[]>([]);
selectedBoard = signal<Board | null>(null);
isViewer = signal(false);
```

### Computed Values
```typescript
lists = computed(() => this.selectedBoard()?.lists ?? []);
```

### Standalone Components
All components are standalone, allowing for better tree-shaking and smaller bundle sizes.

### Lazy Loading
Feature modules are lazy-loaded via Angular Router to improve initial load time.

## Contributing

This is a solo project developed by **Iflak Yousuf Mir**. Feel free to fork and submit pull requests for improvements!

## License

This project is open source and available under the MIT License.

## Developer

**Iflak Yousuf Mir**
- GitHub: [@iflak98](https://github.com/iflak98)
- Email: iflak98@gmail.com

---

Built with ❤️ using Angular 20+

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
