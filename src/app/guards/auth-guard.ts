import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('current route:', route);
  console.log('current state:', state);
  return authService.currentUser$.pipe(
    map((user) => {
      console.log('authGuard: current user:', user);
      if (user) {
        return true;
      }
      return router.createUrlTree(['/']);
    }),
  );
};
