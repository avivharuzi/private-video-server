import { NgModule } from '@angular/core';

import { VideoDurationPipe } from './video-duration.pipe';

@NgModule({
  declarations: [VideoDurationPipe],
  exports: [VideoDurationPipe],
})
export class SharedUiVideoDurationModule {}
