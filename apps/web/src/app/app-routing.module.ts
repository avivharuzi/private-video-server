import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'collections',
    loadChildren: () =>
      import('@private-video-server/collections/shell').then(
        ({ CollectionsShellModule }) => CollectionsShellModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'collections',
  },
  {
    path: '**',
    redirectTo: 'collections',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
