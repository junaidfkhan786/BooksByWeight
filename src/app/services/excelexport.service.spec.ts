import { TestBed } from '@angular/core/testing';

import { ExcelexportService } from './excelexport.service';

describe('ExcelexportService', () => {
  let service: ExcelexportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelexportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
