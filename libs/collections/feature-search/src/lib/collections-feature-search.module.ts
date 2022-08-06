import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollectionsFeatureSearchRoutingModule } from './collections-feature-search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [CommonModule, CollectionsFeatureSearchRoutingModule],
  declarations: [SearchComponent],
})
export class CollectionsFeatureSearchModule {}
