import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, SharedUiIconModule],
  declarations: [ModalComponent, ModalBodyComponent],
  exports: [ModalComponent, ModalBodyComponent],
})
export class SharedUiModalModule {}
