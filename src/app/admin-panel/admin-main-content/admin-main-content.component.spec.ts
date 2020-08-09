import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainContentComponent } from './admin-main-content.component';

describe('AdminMainContentComponent', () => {
  let component: AdminMainContentComponent;
  let fixture: ComponentFixture<AdminMainContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMainContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
