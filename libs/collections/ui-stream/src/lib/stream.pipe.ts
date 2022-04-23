import { Inject, Pipe, PipeTransform } from '@angular/core';

import {
  CollectionsConfig,
  CollectionsConfigInjectionToken,
} from '@private-video-server/collections/data-access';
import { AuthService } from '@private-video-server/shared/data-access-auth';

import { StreamType } from './stream-type';

@Pipe({
  name: 'stream',
})
export class StreamPipe implements PipeTransform {
  private readonly baseAPIUrl = `${this.collectionsConfig.baseAPIUrl}/stream`;

  constructor(
    @Inject(CollectionsConfigInjectionToken)
    private readonly collectionsConfig: CollectionsConfig,
    private readonly authService: AuthService
  ) {}

  transform(value: string, type: StreamType): string {
    const valueEncoded = type !== 'video' ? encodeURIComponent(value) : value;

    const params = new URLSearchParams({
      accessToken: this.authService.getAccessToken() || '',
    });

    return `${this.baseAPIUrl}/${type}/${valueEncoded}?${params.toString()}`;
  }
}
