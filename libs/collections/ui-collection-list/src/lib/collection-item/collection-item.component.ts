import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Collection } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-collection-item[collection]',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionItemComponent {
  @Input() collection!: Collection;
}
