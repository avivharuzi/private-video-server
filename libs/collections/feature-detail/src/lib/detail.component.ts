import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';

import { CollectionsService } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  collection$ = this.activatedRoute.paramMap.pipe(
    switchMap((paramMap) =>
      this.collectionsService.getDetail(paramMap.get('id') || '')
    )
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly collectionsService: CollectionsService
  ) {}
}
