import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import Hls from 'hls.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Plyr from 'plyr';

@Component({
  selector: 'shared-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  @Input() src = '';

  @Input() poster = '';

  @Input() autoplay = false;

  @Input() isHLS = false;

  @ViewChild('videoElement') videoElementRef!: ElementRef;

  plyr?: Plyr;

  ngAfterViewInit(): void {
    this.plyr = new Plyr(this.videoElementRef.nativeElement, {
      iconUrl: '/assets/svg/plyr.svg',
    });

    if (this.isHLS) {
      this.loadHLS();
    }
  }

  ngOnDestroy(): void {
    if (this.plyr) {
      this.plyr.destroy();
    }
  }

  private loadHLS(): void {
    const video = this.videoElementRef.nativeElement;

    if (!Hls.isSupported()) {
      video.src = this.src;
    } else {
      const hls = new Hls();
      hls.loadSource(this.src);
      hls.attachMedia(video);
    }
  }
}
