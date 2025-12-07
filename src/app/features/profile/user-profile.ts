import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/user.model';
import { HeaderComponent } from '../../shared/ui/header/header';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfileComponent implements OnInit {
  user = signal<User | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user.set(currentUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goBack() {
    this.router.navigate(['/boards']);
  }

  getRoleColor(role: string): string {
    const roleColors: { [key: string]: string } = {
      ADMIN: '#dc3545',
      MANAGER: '#ffc107',
      USER: '#28a745',
      VIEWER: '#6c757d'
    };
    return roleColors[role] || '#007bff';
  }

  getRoleDescription(role: string): string {
    const descriptions: { [key: string]: string } = {
      ADMIN: 'Full access to all features and user management',
      MANAGER: 'Can view all tasks and manage team members',
      USER: 'Can view and manage assigned tasks',
      VIEWER: 'Can view tasks but cannot make changes'
    };
    return descriptions[role] || 'User role';
  }

  // Permission checks based on user role
  canViewBoards(): boolean {
    return true; // All roles can view boards
  }

  canDragDropCards(): boolean {
    const role = this.user()?.roles;
    return role !== 'VIEWER'; // Everyone except VIEWER
  }

  canViewAllTasks(): boolean {
    const role = this.user()?.roles;
    return role === 'ADMIN' || role === 'MANAGER';
  }

  canViewAdminTasks(): boolean {
    return this.user()?.roles === 'ADMIN';
  }

  canManageUsers(): boolean {
    const role = this.user()?.roles;
    return role === 'ADMIN' || role === 'MANAGER';
  }

  canEditTaskPriority(): boolean {
    const role = this.user()?.roles;
    return role === 'ADMIN' || role === 'MANAGER';
  }

  getTaskViewDesc(): string {
    const role = this.user()?.roles;
    if (role === 'ADMIN' || role === 'MANAGER') {
      return 'View all tasks across all boards';
    } else if (role === 'USER') {
      return 'View only assigned tasks';
    } else {
      return 'View all public tasks';
    }
  }
}
