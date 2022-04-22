import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

import { AccessTokenInterceptor } from './access-token.interceptor';
import { AuthConfig, AuthConfigConfigInjectionToken } from './auth-config';
import { AuthService } from './auth.service';

@NgModule()
export class SharedDataAccessAuthModule {
  static forRoot(
    config: AuthConfig
  ): ModuleWithProviders<SharedDataAccessAuthModule> {
    return {
      ngModule: SharedDataAccessAuthModule,
      providers: [
        {
          provide: AuthConfigConfigInjectionToken,
          useValue: config,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: (authService: AuthService) => {
            return () => {
              return authService.init();
            };
          },
          multi: true,
          deps: [AuthService],
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AccessTokenInterceptor,
          multi: true,
        },
      ],
    };
  }
}
