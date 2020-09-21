import { TestBed } from '@angular/core/testing';

import { PathResolveServiceService } from './path-resolve-service.service';

describe('PathResolveServiceService', () => {
  let service: PathResolveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathResolveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
