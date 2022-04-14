import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollectionsUiVideoListModule } from '@private-video-server/collections/ui-video-list';

import { CollectionsFeatureDetailRoutingModule } from './collections-feature-detail-routing.module';
import { DetailComponent } from './detail.component';

@NgModule({
  imports: [
    CollectionsFeatureDetailRoutingModule,
    CommonModule,
    CollectionsUiVideoListModule,
  ],
  declarations: [DetailComponent],
})
export class CollectionsFeatureDetailModule {}
