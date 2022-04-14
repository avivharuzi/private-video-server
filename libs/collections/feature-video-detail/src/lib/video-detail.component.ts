import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'collections-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailComponent {}
