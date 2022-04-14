import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollectionsUiStreamModule } from '@private-video-server/collections/ui-stream';
import { SharedUiModalModule } from '@private-video-server/shared/ui/modal';
import { SharedUiVideoPlayerModule } from '@private-video-server/shared/ui/video-player';

import { CollectionsFeatureVideoDetailRoutingModule } from './collections-feature-video-detail-routing.module';
import { VideoDetailComponent } from './video-detail.component';

@NgModule({
  imports: [
    CollectionsFeatureVideoDetailRoutingModule,
    SharedUiVideoPlayerModule,
    CommonModule,
    CollectionsUiStreamModule,
    SharedUiModalModule,
  ],
  declarations: [VideoDetailComponent],
})
export class CollectionsFeatureVideoDetailModule {}
