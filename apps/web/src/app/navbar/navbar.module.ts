import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectionsFeatureFormModule } from '@private-video-server/collections/feature-form';
import { SharedUiButtonModule } from '@private-video-server/shared/ui/button';
import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';
import { SharedUiModalModule } from '@private-video-server/shared/ui/modal';

import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CollectionsFeatureFormModule,
    SharedUiButtonModule,
    SharedUiIconModule,
    SharedUiModalModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
