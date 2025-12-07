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
  },
  {
    id: 'u3',
    name: 'Project Manager',
    email: 'pm',
    password: 'pm123',
    roles: 'MANAGER'
  },
  {
    id: 'u4',
    name: 'QA Engineer',
    email: 'qa',
    password: 'qa123',
    roles: 'USER'
  },
  {
    id: 'u5',
    name: 'Frontend Developer',
    email: 'frontend',
    password: 'frontend123',
    roles: 'USER'
  },
  {
    id: 'u6',
    name: 'Backend Developer',
    email: 'backend',
    password: 'backend123',
    roles: 'USER'
  },
  {
    id: 'u7',
    name: 'Viewer User',
    email: 'viewer',
    password: 'viewer123',
    roles: 'VIEWER'
  },
  {
    id: 'u8',
    name: 'DevOps Engineer',
    email: 'devops',
    password: 'devops123',
    roles: 'USER'
  },
  {
    id: 'u9',
    name: 'Support User',
    email: 'support',
    password: 'support123',
    roles: 'USER'
  },
  {
    id: 'u10',
    name: 'Super Admin',
    email: 'superadmin',
    password: 'superadmin123',
    roles: 'ADMIN'
  }
];
