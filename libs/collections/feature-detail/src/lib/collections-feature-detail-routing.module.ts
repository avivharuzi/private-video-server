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
        path: 'videos/:videoId',
        loadChildren: () =>
          import('@private-video-server/collections/feature-video-detail').then(
            ({ CollectionsFeatureVideoDetailModule }) =>
              CollectionsFeatureVideoDetailModule,
          ),
      },
      {
        path: 'videos/:videoId/media-info',
        loadChildren: () =>
          import(
            '@private-video-server/collections/feature-video-media-info'
          ).then(
            ({ CollectionsFeatureVideoMediaInfoModule }) =>
              CollectionsFeatureVideoMediaInfoModule,
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
