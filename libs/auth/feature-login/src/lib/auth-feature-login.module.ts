import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedUiButtonModule } from '@private-video-server/shared/ui/button';
import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';
import { SharedUiInputModule } from '@private-video-server/shared/ui/input';
import { SharedUiLoaderModule } from '@private-video-server/shared/ui/loader';

import { AuthFeatureLoginRoutingModule } from './auth-feature-login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthFeatureLoginRoutingModule,
    SharedUiInputModule,
    SharedUiButtonModule,
    SharedUiLoaderModule,
    SharedUiIconModule,
  ],
  declarations: [LoginComponent],
})
export class AuthFeatureLoginModule {}
