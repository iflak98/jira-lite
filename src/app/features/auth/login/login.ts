import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
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

  mockUsers: any[] = USERS_MOCK;
  users: any[] = [];

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.setUniqueRoleUsers();
    this.userService.users$.subscribe((u: any[]) => {
      this.users = u || this.mockUsers;
      // rebuild the mockUsers list (used in quick-select UI)
      this.setUniqueRoleUsers();
    });
  }

  private setUniqueRoleUsers() {
  const roleMap = new Map<string, any>();
  const admins: any[] = [];
  // prefer runtime `users` if loaded, otherwise fallback to static mock
  const source = this.users.length ? this.users : this.mockUsers;

  source.forEach((user: any) => {
    // guard against null/undefined entries
    if (!user) return;
    const role = user.roles ?? 'USER';
    if (role === 'ADMIN') {
      admins.push(user);
    } else if (!roleMap.has(role)) {
      roleMap.set(role, user);
    }
  });

  // Combine admins and one-per-role users
    this.mockUsers = [...admins, ...Array.from(roleMap.values())];
}

  login() {
    this.error = null;

    const source = this.users.length ? this.users : (window as any).__USERS_MOCK || [];
    const user = source.find((u: any) => u && u.email === this.form.email && u.password === this.form.password);

    if (!user) {
      this.error = 'Invalid email or password';
      return;
    }

    this.auth.login(user);
    const role = user.roles ?? '';
    if (role === 'ADMIN' || role === 'MANAGER') {
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
