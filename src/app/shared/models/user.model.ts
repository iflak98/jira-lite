export type UserRole = 'ADMIN' | 'USER' | 'MANAGER' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: UserRole;
}
