import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsRefundPolicyComponent } from './returns-refund-policy.component';

describe('ReturnsRefundPolicyComponent', () => {
  let component: ReturnsRefundPolicyComponent;
  let fixture: ComponentFixture<ReturnsRefundPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnsRefundPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnsRefundPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
