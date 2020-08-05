import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestitemComponent } from './latestitem.component';

describe('LatestitemComponent', () => {
  let component: LatestitemComponent;
  let fixture: ComponentFixture<LatestitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
