import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbooksitemComponent } from './newbooksitem.component';

describe('NewbooksitemComponent', () => {
  let component: NewbooksitemComponent;
  let fixture: ComponentFixture<NewbooksitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbooksitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbooksitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
