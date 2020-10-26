import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDetailComponent } from './admin-order-detail.component';

describe('AdminOrderDetailComponent', () => {
  let component: AdminOrderDetailComponent;
  let fixture: ComponentFixture<AdminOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
