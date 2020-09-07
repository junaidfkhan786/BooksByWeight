import { TestBed } from '@angular/core/testing';

import { CoupontransferService } from './coupontransfer.service';

describe('CoupontransferService', () => {
  let service: CoupontransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoupontransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
