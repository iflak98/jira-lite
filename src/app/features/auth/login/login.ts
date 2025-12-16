import { Component, OnInit } from '@angular/core';
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
export class Login implements OnInit {
  form: LoginForm = {
    email: '',
    password: ''
  };

  error: string | null = null;
  showMockUsers = false;

  mockUsers: any[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.setUniqueRoleUsers();
  }

private setUniqueRoleUsers() {
  const roleMap = new Map<string, any>();
  const admins: any[] = [];

  USERS_MOCK.forEach(user => {
    if (user.roles === 'ADMIN') {
      // Include all admins
      admins.push(user);
    } else if (!roleMap.has(user.roles)) {
      // Include only one user per other role
      roleMap.set(user.roles, user);
    }
  });

  // Combine admins and one-per-role users
  this.mockUsers = [...admins, ...Array.from(roleMap.values())];
}

  login() {
    this.error = null;

    const user = USERS_MOCK.find(
      u => u.email === this.form.email && u.password === this.form.password
    );

    if (!user) {
      this.error = 'Invalid email or password';
      return;
    }

    this.auth.login(user);

    if (user.roles === 'ADMIN' || user.roles === 'MANAGER') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/boards']);
    }
  }

  toggleMockUsers() {
    this.showMockUsers = !this.showMockUsers;
  }

  selectUser(user: any) {
    this.form.email = user.email;
    this.form.password = user.password;
  }
}
