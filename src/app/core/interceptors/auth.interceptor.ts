import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const user = authService.getCurrentUser();

  // If user is not logged in, pass request as-is
  if (!user) {
    return next(req);
  }

  // Mock token – replace with real JWT later
  const authToken = 'mock-jwt-token';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
};
