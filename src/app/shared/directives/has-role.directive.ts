import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../models/user.model';

@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective {
  @Input() set hasRole(role: UserRole) {
    if (this.auth.hasRole(role)) {
      this.vcr.createEmbeddedView(this.tpl);
    } else {
      this.vcr.clear();
    }
  }

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private auth: AuthService
  ) {}
}
