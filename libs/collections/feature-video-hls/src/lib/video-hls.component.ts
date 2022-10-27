import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';

import { VideosService } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-video-hls',
  templateUrl: './video-hls.component.html',
  styleUrls: ['./video-hls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoHlsComponent {
  videoHLS$ = this.activatedRoute.paramMap.pipe(
    switchMap((paramMap) => {
      const videoId = paramMap.get('videoId') || '';

      return this.videosService.createHLS(videoId);
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private videosService: VideosService
  ) {}
}
