import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$: Observable<any[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      // Normalize: filter out null/undefined entries to avoid runtime errors
      const normalized = (users || []).filter(u => !!u).map(u => ({ ...u }));
      this.usersSubject.next(normalized);
    }, () => this.usersSubject.next([]));
  }

  // Return current users snapshot (sync) for other services to enrich data
  getUsersSnapshot(): any[] {
    return this.usersSubject.getValue().filter(u => !!u);
  }
}
