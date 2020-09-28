import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountcardsComponent } from './countcards.component';

describe('CountcardsComponent', () => {
  let component: CountcardsComponent;
  let fixture: ComponentFixture<CountcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
