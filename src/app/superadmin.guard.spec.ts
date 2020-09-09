import { TestBed } from '@angular/core/testing';

import { SuperadminGuard } from './superadmin.guard';

describe('SuperadminGuard', () => {
  let guard: SuperadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuperadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
