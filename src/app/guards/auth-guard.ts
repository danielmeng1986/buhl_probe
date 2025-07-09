import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService, DialogService } from '../services';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const dialogService = inject(DialogService);
  console.log('current route:', route, 'state:', state);
  return authService.currentUser$.pipe(
    map((user) => {
      console.log('authGuard: current user:', user);
      if (user) {
        return true;
      }
      dialogService.openLoginDialog('AUTH.GUARD.LOGIN_REQUIRED');
      return false;
    }),
  );
};
