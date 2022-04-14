import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollectionsFeatureListRoutingModule } from './collections-feature-list-routing.module';
import { ListComponent } from './list.component';

@NgModule({
  imports: [CollectionsFeatureListRoutingModule, CommonModule],
  declarations: [ListComponent],
})
export class CollectionsFeatureListModule {}
