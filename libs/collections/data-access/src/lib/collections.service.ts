import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Collection } from './collection';
import {
  CollectionsConfig,
  CollectionsConfigInjectionToken,
} from './collections-config';
import { CreateCollection } from './create-collection';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private readonly baseAPIUrl = `${this.collectionsConfig.baseAPIUrl}/collections`;

  constructor(
    @Inject(CollectionsConfigInjectionToken)
    private readonly collectionsConfig: CollectionsConfig,
    private readonly httpClient: HttpClient
  ) {}

  getAll(): Observable<Collection[]> {
    return this.httpClient.get<Collection[]>(this.baseAPIUrl);
  }

  getDetail(id: string): Observable<Collection> {
    return this.httpClient.get<Collection>(`${this.baseAPIUrl}/${id}`);
  }

  create(collection: CreateCollection): Observable<Collection> {
    return this.httpClient.post<Collection>(this.baseAPIUrl, collection);
  }
}
