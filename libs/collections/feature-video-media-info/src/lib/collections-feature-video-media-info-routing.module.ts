import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoMediaInfoComponent } from './video-media-info.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VideoMediaInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsFeatureVideoDetailRoutingModule {}
