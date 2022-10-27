import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Plyr from 'plyr';

// eslint-disable-next-line
declare let Hls: any;

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

  // eslint-disable-next-line
  hls?: any;

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

    if (this.isHLS && this.hls) {
      this.hls.destroy();
    }
  }

  private loadHLS(): void {
    const video = this.videoElementRef.nativeElement;

    if (!Hls.isSupported()) {
      video.src = this.src;
    } else {
      this.hls = new Hls();
      this.hls.loadSource(this.src);
      this.hls.attachMedia(video);
    }
  }
}
