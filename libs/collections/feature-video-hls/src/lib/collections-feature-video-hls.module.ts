import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedUiLoaderModule } from '@private-video-server/shared/ui/loader';
import { SharedUiVideoPlayerModule } from '@private-video-server/shared/ui/video-player';

import { CollectionsFeatureVideoHlsRoutingModule } from './collections-feature-video-hls-routing.module';
import { VideoHlsComponent } from './video-hls.component';

@NgModule({
  imports: [
    CommonModule,
    CollectionsFeatureVideoHlsRoutingModule,
    SharedUiLoaderModule,
    SharedUiVideoPlayerModule,
  ],
  declarations: [VideoHlsComponent],
})
export class CollectionsFeatureVideoHlsModule {}
