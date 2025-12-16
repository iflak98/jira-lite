import { User } from '../../shared/models/user.model';

// users.mock.ts
export const USERS_MOCK: User[] = [
  {
    id: 'u1',
    name: 'Iflak',
    email: 'iflak@jiralite.com',
    password: 'iflak123',
    roles: 'ADMIN'
  },
  {
    id: 'u2',
    name: 'Normal User',
    email: 'user@jiralite.com',
    password: 'user123',
    roles: 'USER'
  },
  {
    id: 'u3',
    name: 'Project Manager',
    email: 'pm@jiralite.com',
    password: 'pm123',
    roles: 'MANAGER'
  },
  {
    id: 'u4',
    name: 'QA Engineer',
    email: 'qa@jiralite.com',
    password: 'qa123',
    roles: 'USER'
  },
  {
    id: 'u5',
    name: 'Frontend Developer',
    email: 'frontend@jiralite.com',
    password: 'frontend123',
    roles: 'USER'
  },
  {
    id: 'u6',
    name: 'Backend Developer',
    email: 'backend@jiralite.com',
    password: 'backend123',
    roles: 'USER'
  },
  {
    id: 'u7',
    name: 'Viewer User',
    email: 'viewer@jiralite.com',
    password: 'viewer123',
    roles: 'VIEWER'
  },
  {
    id: 'u8',
    name: 'DevOps Engineer',
    email: 'devops@jiralite.com',
    password: 'devops123',
    roles: 'USER'
  },
  {
    id: 'u9',
    name: 'Support User',
    email: 'support@jiralite.com',
    password: 'support123',
    roles: 'USER'
  },
  {
    id: 'u10',
    name: 'Admin 2',
    email: 'sadmin@jiralite.com',
    password: 'sadmin123',
    roles: 'ADMIN'
  }
];
