import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiblesListComponent } from './collectibles-list.component';

describe('CollectiblesListComponent', () => {
  let component: CollectiblesListComponent;
  let fixture: ComponentFixture<CollectiblesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectiblesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiblesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
