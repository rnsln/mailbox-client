import { CanActivateFn } from '@angular/router';
import {AuthService} from './services/auth.service';
import {inject} from '@angular/core';

export const ISADMINGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)

  return authService.isadmin();
};
