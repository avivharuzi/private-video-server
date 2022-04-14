import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CollectionsService } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  collections$ = this.collectionsService.getAll();

  constructor(private readonly collectionsService: CollectionsService) {}
}
