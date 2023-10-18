import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, switchMap, tap } from 'rxjs';

import { VideosService } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-video-hls',
  templateUrl: './video-hls.component.html',
  styleUrls: ['./video-hls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoHlsComponent {
  isLoading = true;

  videoHLS$ = this.activatedRoute.paramMap.pipe(
    tap(() => {
      this.isLoading = true;
    }),
    switchMap((paramMap) => {
      const videoId = paramMap.get('videoId') || '';

      return this.videosService.createHLS(videoId);
    }),
    tap(() => {
      this.isLoading = false;
    }),
    catchError((error) => {
      this.router.navigate(['/']).then();

      throw error;
    }),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private videosService: VideosService,
  ) {}
}
