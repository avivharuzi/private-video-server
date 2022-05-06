import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable } from 'rxjs';

import { SharedUiToastrService } from './shared-ui-toastr.service';

@Injectable()
export class SharedUiToastrInterceptor implements HttpInterceptor {
  constructor(private readonly sharedUiToastrService: SharedUiToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status !== 401) {
          const message = error.error?.message ?? 'Unknown error';
          this.sharedUiToastrService.showErrorMessage(message);
        }

        throw error;
      })
    );
  }
}
