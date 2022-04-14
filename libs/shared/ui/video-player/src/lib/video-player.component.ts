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

  @ViewChild('videoElement') videoElementRef!: ElementRef;

  plyr?: Plyr;

  ngAfterViewInit(): void {
    this.plyr = new Plyr(this.videoElementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.plyr) {
      this.plyr.destroy();
    }
  }
}
