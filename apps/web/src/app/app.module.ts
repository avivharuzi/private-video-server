import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { CollectionsDataAccessModule } from '@private-video-server/collections/data-access';
import { SharedDataAccessAuthModule } from '@private-video-server/shared/data-access-auth';
import { SharedDataAccessBrowseModule } from '@private-video-server/shared/data-access-browse';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SharedDataAccessAuthModule.forRoot({
      baseAPIUrl: environment.baseAPIUrl,
    }),
    CollectionsDataAccessModule.forRoot({
      baseAPIUrl: environment.baseAPIUrl,
    }),
    SharedDataAccessBrowseModule.forRoot({
      baseAPIUrl: environment.baseAPIUrl,
    }),
    NavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
