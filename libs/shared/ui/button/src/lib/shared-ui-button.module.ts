import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { ButtonComponent } from './button.component';

@NgModule({
  imports: [SharedUiIconModule, CommonModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class SharedUiButtonModule {}
