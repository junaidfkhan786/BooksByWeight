import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountEditComponent } from './user-account-edit.component';

describe('UserAccountEditComponent', () => {
  let component: UserAccountEditComponent;
  let fixture: ComponentFixture<UserAccountEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
