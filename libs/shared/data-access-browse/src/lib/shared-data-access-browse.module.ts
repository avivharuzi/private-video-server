import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  BrowseConfig,
  BrowseConfigConfigInjectionToken,
} from './browse-config';

@NgModule()
export class SharedDataAccessBrowseModule {
  static forRoot(
    config: BrowseConfig
  ): ModuleWithProviders<SharedDataAccessBrowseModule> {
    return {
      ngModule: SharedDataAccessBrowseModule,
      providers: [
        {
          provide: BrowseConfigConfigInjectionToken,
          useValue: config,
        },
      ],
    };
  }
}
