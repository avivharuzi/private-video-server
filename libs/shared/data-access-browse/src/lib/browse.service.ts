import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Browse } from './browse';
import {
  BrowseConfig,
  BrowseConfigConfigInjectionToken,
} from './browse-config';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  private readonly baseAPIUrl = `${this.browseConfig.baseAPIUrl}/browse`;

  constructor(
    @Inject(BrowseConfigConfigInjectionToken)
    private readonly browseConfig: BrowseConfig,
    private readonly httpClient: HttpClient
  ) {}

  getAll(path = '/'): Observable<Browse> {
    return this.httpClient.get<Browse>(
      `${this.baseAPIUrl}/${encodeURIComponent(path)}`
    );
  }
}
