import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { USERS_MOCK } from '../mocks/users.mock';

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly STORAGE_KEY = 'app_users';

  private usersSubject = new BehaviorSubject<any[]>([]);
  users$: Observable<any[]> = this.usersSubject.asObservable();

  constructor() {
    this.loadUsers();
  }

  /* ---------------- LOAD USERS ---------------- */
  loadUsers(): void {
    const savedUsers = localStorage.getItem(this.STORAGE_KEY);

    let users: any[];

    if (savedUsers) {
      users = JSON.parse(savedUsers);
    } else {
      users = USERS_MOCK || [];
      this.persistUsers(users);
    }

    // Normalize to avoid runtime errors
    const normalized = (users || [])
      .filter(u => !!u)
      .map(u => ({ ...u }));

    this.usersSubject.next(normalized);
  }

  /* ---------------- SAVE USERS ---------------- */
  private persistUsers(users: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  /* ---------------- UPDATE USERS ---------------- */
  updateUsers(users: any[]): void {
    const normalized = (users || [])
      .filter(u => !!u)
      .map(u => ({ ...u }));

    this.persistUsers(normalized);
    this.usersSubject.next(normalized);
  }

  /* ---------------- GET SNAPSHOT ---------------- */
  getUsersSnapshot(): any[] {
    return this.usersSubject.getValue().filter(u => !!u);
  }

  /* ---------------- OPTIONAL: RESET TO MOCK ---------------- */
  resetUsers(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.loadUsers();
  }
}
