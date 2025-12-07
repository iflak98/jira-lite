import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="app-footer">
      <div class="footer-content">
        
        <p class="copyright">&copy; 2025 JiraLite. All rights reserved.</p>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.scss']
})
export class FooterComponent {}
