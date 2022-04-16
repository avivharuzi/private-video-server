import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectionItemComponent } from './collection-item/collection-item.component';
import { CollectionListComponent } from './collection-list.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CollectionListComponent, CollectionItemComponent],
  exports: [CollectionListComponent],
})
export class CollectionsUiCollectionListModule {}
