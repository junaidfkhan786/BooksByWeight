import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesitemComponent } from './categoriesitem.component';

describe('CategoriesitemComponent', () => {
  let component: CategoriesitemComponent;
  let fixture: ComponentFixture<CategoriesitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
