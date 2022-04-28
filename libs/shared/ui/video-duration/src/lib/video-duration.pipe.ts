import { Pipe, PipeTransform } from '@angular/core';

import { convertSecondsToTime } from '@private-video-server/shared/util-video';

@Pipe({
  name: 'sharedVideoDuration',
})
export class VideoDurationPipe implements PipeTransform {
  transform(seconds: number): string {
    return convertSecondsToTime(seconds);
  }
}
