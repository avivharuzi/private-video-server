import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, SharedUiIconModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class SharedUiModalModule {}
