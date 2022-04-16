import { InjectionToken } from '@angular/core';

export interface BrowseConfig {
  baseAPIUrl: string;
}

export const BrowseConfigConfigInjectionToken =
  new InjectionToken<BrowseConfig>('browse-config');
