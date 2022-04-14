import { Inject, Pipe, PipeTransform } from '@angular/core';

import {
  CollectionsConfig,
  CollectionsConfigInjectionToken,
} from '@private-video-server/collections/data-access';

import { StreamType } from './stream-type';

@Pipe({
  name: 'stream',
})
export class StreamPipe implements PipeTransform {
  private readonly baseAPIUrl = `${this.collectionsConfig.baseAPIUrl}/stream`;

  constructor(
    @Inject(CollectionsConfigInjectionToken)
    private readonly collectionsConfig: CollectionsConfig
  ) {}

  transform(value: string, type: StreamType): string {
    const valueEncoded = type !== 'video' ? encodeURIComponent(value) : value;

    return `${this.baseAPIUrl}/${type}/${valueEncoded}`;
  }
}
