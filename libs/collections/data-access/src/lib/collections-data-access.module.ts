import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  CollectionsConfig,
  CollectionsConfigInjectionToken,
} from './collections-config';

@NgModule()
export class CollectionsDataAccessModule {
  static forRoot(
    config: CollectionsConfig
  ): ModuleWithProviders<CollectionsDataAccessModule> {
    return {
      ngModule: CollectionsDataAccessModule,
      providers: [
        {
          provide: CollectionsConfigInjectionToken,
          useValue: config,
        },
      ],
    };
  }
}
