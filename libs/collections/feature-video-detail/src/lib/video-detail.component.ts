import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { VideosService } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailComponent {
  @ViewChild('sharedVideoPlayerElement', {
    read: ElementRef,
  })
  sharedVideoPlayerElementRef?: ElementRef;

  collectionId = '';

  video$ = this.activatedRoute.paramMap.pipe(
    switchMap((paramMap) => {
      this.collectionId = paramMap.get('id') || '';

      return this.videosService.getDetail(paramMap.get('videoId') || '');
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

  onSharedVideoPlayerClick(event: Event): void {
    const nativeElement = this.sharedVideoPlayerElementRef?.nativeElement;

    if (nativeElement && nativeElement === event.target) {
      this.onModalClosed();
    }
  }
}
