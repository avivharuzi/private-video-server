import { TestBed } from '@angular/core/testing';

import { SharedUiToastrInterceptor } from './shared-ui-toastr.interceptor';

describe('SharedUiToastrInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [SharedUiToastrInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: SharedUiToastrInterceptor = TestBed.inject(
      SharedUiToastrInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
