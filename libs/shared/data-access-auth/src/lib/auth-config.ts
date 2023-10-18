import { InjectionToken } from '@angular/core';

export interface AuthConfig {
  baseAPIUrl: string;
}

export const AuthConfigConfigInjectionToken = new InjectionToken<AuthConfig>(
  'auth-config',
);
