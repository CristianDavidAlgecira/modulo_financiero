import { TestBed } from '@angular/core/testing';

import { ApiMuvService } from './api-muv.service';

describe('ApiMuvServiceService', () => {
  let service: ApiMuvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMuvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
