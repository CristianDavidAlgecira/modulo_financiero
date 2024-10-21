import { TestBed } from '@angular/core/testing';

import { ApiMFService } from './api-mf.service';

describe('ApiMFService', () => {
  let service: ApiMFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
