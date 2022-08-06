import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectionsUiStreamModule } from '@private-video-server/collections/ui-stream';

import { SearchVideoListComponent } from './search-video-list.component';

@NgModule({
  imports: [CommonModule, RouterModule, CollectionsUiStreamModule],
  declarations: [SearchVideoListComponent],
  exports: [SearchVideoListComponent],
})
export class CollectionsUiSearchVideoListModule {}
