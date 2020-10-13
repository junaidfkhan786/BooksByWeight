import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesitemComponent } from './subcategoriesitem.component';

describe('SubcategoriesitemComponent', () => {
  let component: SubcategoriesitemComponent;
  let fixture: ComponentFixture<SubcategoriesitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriesitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriesitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
