import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CollectionsUiStreamModule } from '@private-video-server/collections/ui-stream';
import { SharedUiActionMenuModule } from '@private-video-server/shared/ui/action-menu';
import { SharedUiButtonModule } from '@private-video-server/shared/ui/button';
import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';
import { SharedUiInputModule } from '@private-video-server/shared/ui/input';
import { SharedUiLoaderModule } from '@private-video-server/shared/ui/loader';
import { SharedUiVideoDurationModule } from '@private-video-server/shared/ui/video-duration';
import { SharedUiVideoQualityModule } from '@private-video-server/shared/ui/video-quality';

import { VideoItemComponent } from './video-item/video-item.component';
import { VideoListComponent } from './video-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CollectionsUiStreamModule,
    SharedUiActionMenuModule,
    SharedUiButtonModule,
    SharedUiIconModule,
    SharedUiInputModule,
    SharedUiLoaderModule,
    SharedUiVideoQualityModule,
    SharedUiVideoDurationModule,
  ],
  declarations: [VideoListComponent, VideoItemComponent],
  exports: [VideoListComponent],
})
export class CollectionsUiVideoListModule {}
