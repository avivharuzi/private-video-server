import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Video } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-search-video-list',
  templateUrl: './search-video-list.component.html',
  styleUrls: ['./search-video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchVideoListComponent {
  @Input() videos: Video[] = [];
}
