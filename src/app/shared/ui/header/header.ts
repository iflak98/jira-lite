import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
// import { Login } from '../../auth/login/login';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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
    if (this.auth.hasRole('ADMIN')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/boards']);
    }
  }
}
