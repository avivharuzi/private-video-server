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

  delete(id: string): Observable<Video> {
    return this.httpClient.delete<Video>(`${this.baseAPIUrl}/${id}`);
  }

  changeCoverThumbnail(id: string, file: File): Observable<Video> {
    const formData = new FormData();
    formData.set('coverThumbnail', file);

    return this.httpClient.post<Video>(
      `${this.baseAPIUrl}/${id}/change-cover-thumbnail`,
      formData
    );
  }
}
