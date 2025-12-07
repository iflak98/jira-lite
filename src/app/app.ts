import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FooterComponent } from './shared/ui/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, CommonModule],
  template: `
    <div class="app-wrapper">
      <div class="app-content">
        <router-outlet></router-outlet>
      </div>
      <app-footer *ngIf="!isLoginPage()"></app-footer>
    </div>
  `,
  styleUrls: ['./app.scss']
})
export class App {
  private router = inject(Router);

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
