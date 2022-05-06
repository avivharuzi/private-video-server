import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [CommonModule, SharedUiIconModule],
  declarations: [ToastComponent],
})
export class SharedUiToastrModule {}
