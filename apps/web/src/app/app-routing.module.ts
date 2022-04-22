import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@private-video-server/shared/data-access-auth';

import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('@private-video-server/auth/feature-login').then(
        ({ AuthFeatureLoginModule }) => AuthFeatureLoginModule
      ),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'collections',
      },
      {
        path: 'collections',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@private-video-server/collections/shell').then(
            ({ CollectionsShellModule }) => CollectionsShellModule
          ),
      },
    ],
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
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
