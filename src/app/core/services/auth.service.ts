import { Injectable } from '@angular/core';
import { User, UserRole } from "../../shared/models/user.model";

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

  // Check if user has a specific role or one of multiple roles
  hasRole(role: UserRole | UserRole[]): boolean {
    if (!this.currentUser || !this.currentUser.roles) return false;
    
    // If role is an array, check if user's role is in that array
    if (Array.isArray(role)) {
      return role.includes(this.currentUser.roles);
    }
    
    // If role is a string, check for exact match
    return this.currentUser.roles === role;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
