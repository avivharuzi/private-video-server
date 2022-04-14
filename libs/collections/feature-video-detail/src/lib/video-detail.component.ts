import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';

import { VideosService } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailComponent {
  video$ = this.activatedRoute.paramMap.pipe(
    switchMap((paramMap) =>
      this.videosService.getDetail(paramMap.get('id') || '')
    )
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly videosService: VideosService
  ) {}
}
