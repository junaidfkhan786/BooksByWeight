import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistitemComponent } from './wishlistitem.component';

describe('WishlistitemComponent', () => {
  let component: WishlistitemComponent;
  let fixture: ComponentFixture<WishlistitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
