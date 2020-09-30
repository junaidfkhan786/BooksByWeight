import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksearchComponent } from './booksearch.component';

describe('BooksearchComponent', () => {
  let component: BooksearchComponent;
  let fixture: ComponentFixture<BooksearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
