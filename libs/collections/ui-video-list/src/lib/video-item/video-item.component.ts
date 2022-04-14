import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Video } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-video-item[video]',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoItemComponent {
  @Input() video!: Video;

  isVideoPreview = false;
}
