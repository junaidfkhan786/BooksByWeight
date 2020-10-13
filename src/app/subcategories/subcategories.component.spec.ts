import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesComponent } from './subcategories.component';

describe('SubcategoriesComponent', () => {
  let component: SubcategoriesComponent;
  let fixture: ComponentFixture<SubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
