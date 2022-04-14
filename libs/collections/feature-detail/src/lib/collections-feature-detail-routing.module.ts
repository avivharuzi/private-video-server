import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './detail.component';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
    children: [
      {
        path: 'videos',
        pathMatch: 'full',
        redirectTo: '',
      },
      {
        path: 'videos/:id',
        loadChildren: () =>
          import('@private-video-server/collections/feature-video-detail').then(
            ({ CollectionsFeatureVideoDetailModule }) =>
              CollectionsFeatureVideoDetailModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsFeatureDetailRoutingModule {}
