import { Injectable } from '@angular/core';
import { User } from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor() {}

  // Login sets the current user
  login(user: User) {
    this.currentUser = user;
  }

  // Logout clears the current user
  logout() {
    this.currentUser = null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Check if user has a specific role
  hasRole(role: string): boolean {
    if (!this.currentUser || !this.currentUser.roles) return false;
    return this.currentUser.roles.includes(role);
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
