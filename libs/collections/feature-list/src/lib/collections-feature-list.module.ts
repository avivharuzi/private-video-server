import { NgModule } from '@angular/core';

import { CollectionsFeatureListRoutingModule } from './collections-feature-list-routing.module';
import { ListComponent } from './list.component';

@NgModule({
  imports: [CollectionsFeatureListRoutingModule],
  declarations: [ListComponent],
})
export class CollectionsFeatureListModule {}
