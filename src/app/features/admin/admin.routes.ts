import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: ['ADMIN', 'MANAGER'] }, 
    loadComponent: () =>
      import('./user-management/user-management')
        .then(m => m.UserManagementComponent)
  }
];
