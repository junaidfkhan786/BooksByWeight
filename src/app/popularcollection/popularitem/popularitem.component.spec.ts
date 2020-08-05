import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularitemComponent } from './popularitem.component';

describe('PopularitemComponent', () => {
  let component: PopularitemComponent;
  let fixture: ComponentFixture<PopularitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
