import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedUiButtonModule } from '@private-video-server/shared/ui/button';
import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { BrowseSelectComponent } from './browse-select/browse-select.component';
import { BrowseComponent } from './browse.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiIconModule,
    SharedUiButtonModule,
    FormsModule,
  ],
  declarations: [BrowseComponent, BrowseSelectComponent],
  exports: [BrowseComponent],
})
export class SharedFeatureBrowseModule {}
