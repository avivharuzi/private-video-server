import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { SharedUiToastrInterceptor } from './shared-ui-toastr.interceptor';
import { ToastComponent } from './toast/toast.component';
import { ToastrContainerComponent } from './toastr-container/toastr-container.component';

@NgModule({
  imports: [CommonModule, SharedUiIconModule],
  declarations: [ToastComponent, ToastrContainerComponent],
})
export class SharedUiToastrModule {
  static forRoot(): ModuleWithProviders<SharedUiToastrModule> {
    return {
      ngModule: SharedUiToastrModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SharedUiToastrInterceptor,
          multi: true,
        },
      ],
    };
  }
}
