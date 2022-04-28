import { Pipe, PipeTransform } from '@angular/core';

import { convertSecondsToMinutes } from '@private-video-server/shared/util-video';

@Pipe({
  name: 'sharedVideoDuration',
})
export class VideoDurationPipe implements PipeTransform {
  transform(seconds: number): string {
    return `${convertSecondsToMinutes(seconds)} min`;
  }
}
