import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Collection } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionListComponent {
  @Input() collections: Collection[] = [];
}
