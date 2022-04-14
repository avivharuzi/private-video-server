import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  CollectionsConfig,
  CollectionsConfigInjectionToken,
} from './collections-config';
import { Video } from './video';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private readonly baseAPIUrl = `${this.collectionsConfig.baseAPIUrl}/videos`;

  constructor(
    @Inject(CollectionsConfigInjectionToken)
    private readonly collectionsConfig: CollectionsConfig,
    private readonly httpClient: HttpClient
  ) {}

  getDetail(id: string): Observable<Video> {
    return this.httpClient.get<Video>(`${this.baseAPIUrl}/${id}`);
  }
}
