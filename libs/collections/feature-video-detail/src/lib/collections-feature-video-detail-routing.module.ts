import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoDetailComponent } from './video-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VideoDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsFeatureVideoDetailRoutingModule {}
