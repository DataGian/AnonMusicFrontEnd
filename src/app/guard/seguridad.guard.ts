import { ActivatedRouteSnapshot,  Router, RouterStateSnapshot } from '@angular/router';

import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const seguridadGuard= (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
const lService = inject(LoginService);
  const router = inject(Router);

  const rpta = lService.verificar();

  if (!rpta) {
    router.navigate(['/login']);
    return false;
  }

  const rol = lService.showRole();
  const url = state.url;

  if (
    rol === 'Tester' &&
    (
      url.includes('/notificaciones') ||
      url.includes('/seguidos') ||
      url.includes('/seguidores')
    )
  ) {
    router.navigate(['/usuarios']);
    return false;
  }

  return true;
};