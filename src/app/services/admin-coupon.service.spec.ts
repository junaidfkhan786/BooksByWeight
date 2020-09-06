import { TestBed } from '@angular/core/testing';

import { AdminCouponService } from './admin-coupon.service';

describe('AdminCouponService', () => {
  let service: AdminCouponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCouponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
