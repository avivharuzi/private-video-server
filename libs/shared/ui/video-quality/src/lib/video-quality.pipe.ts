import { Pipe, PipeTransform } from '@angular/core';

import {
  getResolution,
  Resolution,
} from '@private-video-server/shared/util-video';

@Pipe({
  name: 'sharedVideoQuality',
})
export class VideoQualityPipe implements PipeTransform {
  transform([width, height]: [width: number, height: number]): Resolution {
    return getResolution(width, height);
  }
}
