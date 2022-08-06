import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollectionsUiVideoListModule } from '@private-video-server/collections/ui-video-list';

import { CollectionsFeatureSearchRoutingModule } from './collections-feature-search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    CollectionsFeatureSearchRoutingModule,
    CollectionsUiVideoListModule,
  ],
  declarations: [SearchComponent],
})
export class CollectionsFeatureSearchModule {}
