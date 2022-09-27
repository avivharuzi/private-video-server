import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedUiModalModule } from '@private-video-server/shared/ui/modal';

import { CollectionsFeatureVideoDetailRoutingModule } from './collections-feature-video-media-info-routing.module';
import { MediaInfoItemComponent } from './media-info-item/media-info-item.component';
import { VideoMediaInfoComponent } from './video-media-info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiModalModule,
    CollectionsFeatureVideoDetailRoutingModule,
  ],
  declarations: [VideoMediaInfoComponent, MediaInfoItemComponent],
})
export class CollectionsFeatureVideoMediaInfoModule {}
