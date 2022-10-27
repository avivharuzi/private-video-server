import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VideoPlayerComponent } from './video-player.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VideoPlayerComponent],
  exports: [VideoPlayerComponent],
})
export class SharedUiVideoPlayerModule {}
