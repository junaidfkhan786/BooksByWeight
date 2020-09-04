import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatSubcatComponent } from './add-cat-subcat.component';

describe('AddCatSubcatComponent', () => {
  let component: AddCatSubcatComponent;
  let fixture: ComponentFixture<AddCatSubcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCatSubcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCatSubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
