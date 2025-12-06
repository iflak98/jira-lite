import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { USERS_MOCK } from '../../../core/mocks/users.mock';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  form: LoginForm = {
    email: '',
    password: ''
  };

  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error = null;

    // Find user in mock
    const user = USERS_MOCK.find(
      u => u.email === this.form.email && u.password === this.form.password
    );

    if (!user) {
      this.error = 'Invalid email or password';
      return;
    }

    // Login via AuthService
    this.auth.login(user);

    // Navigate based on role
    if (user.roles === 'ADMIN') {
      this.router.navigate(['/admin']); // Admin dashboard
    } else {
      this.router.navigate(['/boards']); // Normal user boards
    }
  }
}
