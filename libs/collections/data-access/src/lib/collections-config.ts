import { InjectionToken } from '@angular/core';

export interface CollectionsConfig {
  baseAPIUrl: string;
}

export const CollectionsConfigInjectionToken =
  new InjectionToken<CollectionsConfig>('collections-config');
