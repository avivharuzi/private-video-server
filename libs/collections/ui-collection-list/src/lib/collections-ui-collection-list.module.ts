import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedUiActionMenuModule } from '@private-video-server/shared/ui/action-menu';
import { SharedUiButtonModule } from '@private-video-server/shared/ui/button';

import { CollectionItemComponent } from './collection-item/collection-item.component';
import { CollectionListComponent } from './collection-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedUiButtonModule,
    SharedUiActionMenuModule,
  ],
  declarations: [CollectionListComponent, CollectionItemComponent],
  exports: [CollectionListComponent],
})
export class CollectionsUiCollectionListModule {}
