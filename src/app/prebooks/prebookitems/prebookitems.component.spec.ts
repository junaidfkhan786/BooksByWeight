import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebookitemsComponent } from './prebookitems.component';

describe('PrebookitemsComponent', () => {
  let component: PrebookitemsComponent;
  let fixture: ComponentFixture<PrebookitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebookitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebookitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
