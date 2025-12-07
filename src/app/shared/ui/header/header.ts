import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goHome() {
    if (this.auth.hasRole('ADMIN') || this.auth.hasRole('MANAGER')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/boards']);
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
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
}

