import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

import { AuthConfig, AuthConfigConfigInjectionToken } from './auth-config';
import { AuthToken } from './auth-token';
import { Login } from './login';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly KEY_ACCESS_TOKEN = 'accessToken';

  private readonly baseAPIUrl = `${this.browseConfig.baseAPIUrl}/auth`;

  private userSubject = new BehaviorSubject<User | null>(null);

  user$ = this.userSubject.asObservable();

  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  constructor(
    @Inject(AuthConfigConfigInjectionToken)
    private readonly browseConfig: AuthConfig,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {}

  init(): Observable<void> {
    return this.getProfile().pipe(
      tap((user) => {
        this.userSubject.next(user);
      }),
      catchError(() => {
        return EMPTY;
      }),
      map(() => {
        return;
      }),
    );
  }

  login(login: Login): Observable<User> {
    return this.httpClient
      .post<AuthToken>(`${this.baseAPIUrl}/login`, login)
      .pipe(
        tap((authToken) => {
          this.setAccessToken(authToken);
        }),
        switchMap(() => this.getProfile()),
        tap((user) => {
          this.userSubject.next(user);
          this.router.navigate(['/']).then();
        }),
      );
  }

  logout(): void {
    this.removeAccessToken();
    this.userSubject.next(null);
    this.router.navigate(['/login']).then();
  }

  getProfile(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseAPIUrl}/profile`);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.KEY_ACCESS_TOKEN);
  }

  private setAccessToken({ accessToken }: AuthToken): void {
    localStorage.setItem(this.KEY_ACCESS_TOKEN, accessToken);
  }

  private removeAccessToken(): void {
    localStorage.removeItem(this.KEY_ACCESS_TOKEN);
  }
}
