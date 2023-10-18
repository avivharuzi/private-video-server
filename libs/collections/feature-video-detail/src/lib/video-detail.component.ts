import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap, tap } from 'rxjs';

import {
  Video,
  VideosService,
} from '@private-video-server/collections/data-access';

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

      return this.videosService
        .getDetail(paramMap.get('videoId') || '')
        .pipe(tap((video) => (this.video = video)));
    }),
  );

  video?: Video;

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter' || !event.metaKey) {
      return;
    }

    this.takeScreenshot();
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly videosService: VideosService,
    private readonly router: Router,
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

  takeScreenshot(): void {
    const video = this.video;
    if (!video) {
      return;
    }

    const videoHTMLElement = document.querySelector('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.info.width;
    canvas.height = video.info.height;
    const canvasContext = canvas.getContext('2d');
    if (canvasContext === null) {
      return;
    }
    canvasContext.drawImage(
      videoHTMLElement as CanvasImageSource,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    const dataURI = canvas.toDataURL('image/jpg');

    const link = document.createElement('a');
    link.href = dataURI;
    link.target = '_blank';
    link.download = `${video.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
