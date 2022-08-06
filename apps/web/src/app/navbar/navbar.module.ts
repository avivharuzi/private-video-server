import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectionsFeatureFormModule } from '@private-video-server/collections/feature-form';
import { CollectionsUiSearchVideoListModule } from '@private-video-server/collections/ui-search-video-list';
import { SharedUiActionMenuModule } from '@private-video-server/shared/ui/action-menu';
import { SharedUiButtonModule } from '@private-video-server/shared/ui/button';
import { SharedUiClickOutsideModule } from '@private-video-server/shared/ui/click-outside';
import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';
import { SharedUiInputModule } from '@private-video-server/shared/ui/input';
import { SharedUiModalModule } from '@private-video-server/shared/ui/modal';

import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CollectionsFeatureFormModule,
    SharedUiButtonModule,
    SharedUiInputModule,
    SharedUiIconModule,
    SharedUiModalModule,
    SharedUiActionMenuModule,
    SharedUiClickOutsideModule,
    CollectionsUiSearchVideoListModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
