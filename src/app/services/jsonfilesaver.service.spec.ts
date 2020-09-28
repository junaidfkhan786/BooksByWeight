import { TestBed } from '@angular/core/testing';

import { JsonfilesaverService } from './jsonfilesaver.service';

describe('JsonfilesaverService', () => {
  let service: JsonfilesaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonfilesaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
