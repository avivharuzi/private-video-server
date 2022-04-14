import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Video } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent {
  @Input() videos: Video[] = [];
}
