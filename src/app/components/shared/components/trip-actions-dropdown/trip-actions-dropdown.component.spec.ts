import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripActionsDropdownComponent } from './trip-actions-dropdown.component';

describe('TripActionsDropdownComponent', () => {
  let component: TripActionsDropdownComponent;
  let fixture: ComponentFixture<TripActionsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripActionsDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripActionsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
