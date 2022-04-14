import { NgModule } from '@angular/core';

import { CollectionsFeatureVideoDetailRoutingModule } from './collections-feature-video-detail-routing.module';
import { VideoDetailComponent } from './video-detail.component';

@NgModule({
  imports: [CollectionsFeatureVideoDetailRoutingModule],
  declarations: [VideoDetailComponent],
})
export class CollectionsFeatureVideoDetailModule {}
