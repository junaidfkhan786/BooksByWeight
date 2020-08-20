import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebooksComponent } from './prebooks.component';

describe('PrebooksComponent', () => {
  let component: PrebooksComponent;
  let fixture: ComponentFixture<PrebooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
