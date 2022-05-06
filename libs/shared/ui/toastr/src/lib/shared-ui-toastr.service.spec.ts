import { TestBed } from '@angular/core/testing';

import { SharedUiToastrService } from './shared-ui-toastr.service';

describe('SharedUiToastrService', () => {
  let service: SharedUiToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedUiToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
