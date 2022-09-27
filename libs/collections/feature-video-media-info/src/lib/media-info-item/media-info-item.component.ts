import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MediaInfoGroup } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-media-info-item[mediaInfoItem]',
  templateUrl: './media-info-item.component.html',
  styleUrls: ['./media-info-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaInfoItemComponent {
  @Input() mediaInfoItem!: MediaInfoGroup;
}
