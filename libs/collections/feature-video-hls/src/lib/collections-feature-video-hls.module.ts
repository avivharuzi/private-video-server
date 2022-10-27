import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollectionsFeatureVideoHlsRoutingModule } from './collections-feature-video-hls-routing.module';
import { VideoHlsComponent } from './video-hls.component';

@NgModule({
  imports: [CommonModule, CollectionsFeatureVideoHlsRoutingModule],
  declarations: [VideoHlsComponent],
})
export class CollectionsFeatureVideoHlsModule {}
