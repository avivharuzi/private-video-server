import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { CollectionsFeatureListRoutingModule } from './collections-feature-list-routing.module';
import { ListComponent } from './list.component';

@NgModule({
  imports: [
    CollectionsFeatureListRoutingModule,
    CommonModule,
    SharedUiIconModule,
  ],
  declarations: [ListComponent],
})
export class CollectionsFeatureListModule {}
