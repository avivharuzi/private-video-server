import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoHlsComponent } from './video-hls.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VideoHlsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsFeatureVideoHlsRoutingModule {}
