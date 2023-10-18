import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';

import { VideosService } from '@private-video-server/collections/data-access';

@Component({
  selector: 'collections-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchTerm = '';

  videos$ = this.activatedRoute.paramMap.pipe(
    switchMap((paramMap) => {
      this.searchTerm = paramMap.get('searchTerm') || '';

      return this.videosService.getAll({
        searchTerm: this.searchTerm,
      });
    }),
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly videosService: VideosService,
  ) {}
}
