import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbooksComponent } from './newbooks.component';

describe('NewbooksComponent', () => {
  let component: NewbooksComponent;
  let fixture: ComponentFixture<NewbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
