import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestcollectionComponent } from './latestcollection.component';

describe('LatestcollectionComponent', () => {
  let component: LatestcollectionComponent;
  let fixture: ComponentFixture<LatestcollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestcollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
