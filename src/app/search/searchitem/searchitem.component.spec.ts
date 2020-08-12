import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchitemComponent } from './searchitem.component';

describe('SearchitemComponent', () => {
  let component: SearchitemComponent;
  let fixture: ComponentFixture<SearchitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
