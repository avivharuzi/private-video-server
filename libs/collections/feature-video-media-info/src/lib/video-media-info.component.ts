import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { VideosService } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-video-media-info',
  templateUrl: './video-media-info.component.html',
  styleUrls: ['./video-media-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoMediaInfoComponent {
  collectionId = '';

  mediaInfo$ = this.activatedRoute.paramMap.pipe(
    switchMap((paramMap) => {
      this.collectionId = paramMap.get('id') || '';

      return this.videosService.getMediaInfo(paramMap.get('videoId') || '');
    })
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly videosService: VideosService,
    private readonly router: Router
  ) {}

  onModalClosed(): void {
    this.router.navigate(['collections', this.collectionId]).then();
  }
}
