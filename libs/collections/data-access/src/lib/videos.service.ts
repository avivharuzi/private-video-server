import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import {
  CollectionsConfig,
  CollectionsConfigInjectionToken,
} from './collections-config';
import { MediaInfo, MediaInfoDetail, MediaInfoFormatted } from './media-info';
import { Video, VideoQueryParams } from './video';

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

  getAll(params: Partial<VideoQueryParams>): Observable<Video[]> {
    return this.httpClient.get<Video[]>(this.baseAPIUrl, {
      params,
    });
  }

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

  getMediaInfo(id: string): Observable<MediaInfo> {
    return this.httpClient
      .get<MediaInfoFormatted>(`${this.baseAPIUrl}/${id}/media-info`)
      .pipe(
        map((mediaInfoFormatted) => {
          return Object.entries(mediaInfoFormatted).map(
            ([name, detailsBefore]) => {
              const details: MediaInfoDetail[] = Object.entries(
                detailsBefore
              ).map(([key, value]) => {
                return {
                  key,
                  value,
                };
              });

              return {
                name,
                details,
              };
            }
          );
        })
      );
  }
}
