import { NgModule } from '@angular/core';

import { VideoQualityPipe } from './video-quality.pipe';

@NgModule({
  declarations: [VideoQualityPipe],
  exports: [VideoQualityPipe],
})
export class SharedUiVideoQualityModule {}
