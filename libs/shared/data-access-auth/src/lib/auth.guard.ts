import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

import { first, Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(first());
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
