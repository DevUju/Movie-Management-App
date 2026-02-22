import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuth = auth.isAuthenticated();
  console.log('[AuthGuard] Checking auth for route:', state.url, 'isAuthenticated:', isAuth);
  
  if (isAuth) {
    return true;
  }

  console.log('[AuthGuard] Not authenticated, redirecting to login');
  router.navigate(['/login']);
  return false;
};