import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedUiButtonModule } from '@private-video-server/shared/ui/button';
import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedUiButtonModule,
    SharedUiIconModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
