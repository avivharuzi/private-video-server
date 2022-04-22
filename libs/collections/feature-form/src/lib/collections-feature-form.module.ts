import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedFeatureBrowseModule } from '@private-video-server/shared/feature-browse';
import { SharedUiButtonModule } from '@private-video-server/shared/ui/button';
import { SharedUiInputModule } from '@private-video-server/shared/ui/input';
import { SharedUiLoaderModule } from '@private-video-server/shared/ui/loader';
import { SharedUiModalModule } from '@private-video-server/shared/ui/modal';

import { FormComponent } from './form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedFeatureBrowseModule,
    SharedUiButtonModule,
    SharedUiInputModule,
    SharedUiLoaderModule,
    SharedUiModalModule,
  ],
  declarations: [FormComponent],
  exports: [FormComponent],
})
export class CollectionsFeatureFormModule {}
