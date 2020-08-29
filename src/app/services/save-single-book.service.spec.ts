import { TestBed } from '@angular/core/testing';

import { SaveSingleBookService } from './save-single-book.service';

describe('SaveSingleBookService', () => {
  let service: SaveSingleBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveSingleBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
