import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedUiButtonModule } from '@private-video-server/shared/ui/button';
import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';
import { SharedUiInputModule } from '@private-video-server/shared/ui/input';

import { BrowseSelectComponent } from './browse-select/browse-select.component';
import { BrowseComponent } from './browse.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiIconModule,
    SharedUiButtonModule,
    SharedUiInputModule,
    FormsModule,
  ],
  declarations: [BrowseComponent, BrowseSelectComponent],
  exports: [BrowseComponent],
})
export class SharedFeatureBrowseModule {}
