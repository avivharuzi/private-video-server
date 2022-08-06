import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@private-video-server/collections/feature-list').then(
        ({ CollectionsFeatureListModule }) => CollectionsFeatureListModule
      ),
  },
  {
    path: 'search',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/collections',
      },
      {
        path: ':searchTerm',
        loadChildren: () =>
          import('@private-video-server/collections/feature-search').then(
            ({ CollectionsFeatureSearchModule }) =>
              CollectionsFeatureSearchModule
          ),
      },
    ],
  },
  {
    path: ':id',
    loadChildren: () =>
      import('@private-video-server/collections/feature-detail').then(
        ({ CollectionsFeatureDetailModule }) => CollectionsFeatureDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsShellRoutingModule {}
