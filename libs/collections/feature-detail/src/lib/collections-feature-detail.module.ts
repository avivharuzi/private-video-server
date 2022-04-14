import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollectionsFeatureDetailRoutingModule } from './collections-feature-detail-routing.module';
import { DetailComponent } from './detail.component';

@NgModule({
  imports: [CollectionsFeatureDetailRoutingModule, CommonModule],
  declarations: [DetailComponent],
})
export class CollectionsFeatureDetailModule {}
