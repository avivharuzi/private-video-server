import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectionsUiStreamModule } from '@private-video-server/collections/ui-stream';
import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { VideoItemComponent } from './video-item/video-item.component';
import { VideoListComponent } from './video-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CollectionsUiStreamModule,
    SharedUiIconModule,
  ],
  declarations: [VideoListComponent, VideoItemComponent],
  exports: [VideoListComponent],
})
export class CollectionsUiVideoListModule {}
