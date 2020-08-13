import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraddressComponent } from './useraddress.component';

describe('UseraddressComponent', () => {
  let component: UseraddressComponent;
  let fixture: ComponentFixture<UseraddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
