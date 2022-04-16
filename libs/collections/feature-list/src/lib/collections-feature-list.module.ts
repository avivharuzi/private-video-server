import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollectionsUiCollectionListModule } from '@private-video-server/collections/ui-collection-list';

import { CollectionsFeatureListRoutingModule } from './collections-feature-list-routing.module';
import { ListComponent } from './list.component';

@NgModule({
  imports: [
    CollectionsFeatureListRoutingModule,
    CommonModule,
    CollectionsUiCollectionListModule,
  ],
  declarations: [ListComponent],
})
export class CollectionsFeatureListModule {}
