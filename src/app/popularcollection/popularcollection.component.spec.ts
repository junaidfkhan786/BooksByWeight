import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularcollectionComponent } from './popularcollection.component';

describe('PopularcollectionComponent', () => {
  let component: PopularcollectionComponent;
  let fixture: ComponentFixture<PopularcollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularcollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
