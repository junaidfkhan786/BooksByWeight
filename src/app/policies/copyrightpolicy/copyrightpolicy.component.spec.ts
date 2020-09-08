import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightpolicyComponent } from './copyrightpolicy.component';

describe('CopyrightpolicyComponent', () => {
  let component: CopyrightpolicyComponent;
  let fixture: ComponentFixture<CopyrightpolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyrightpolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
