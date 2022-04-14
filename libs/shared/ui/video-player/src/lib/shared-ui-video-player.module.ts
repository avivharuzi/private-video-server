import { NgModule } from '@angular/core';

import { VideoPlayerComponent } from './video-player.component';

@NgModule({
  declarations: [VideoPlayerComponent],
  exports: [VideoPlayerComponent],
})
export class SharedUiVideoPlayerModule {}
