import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypesListComponent } from './appointment-types-list.component';

describe('AppointmentTypesListComponent', () => {
  let component: AppointmentTypesListComponent;
  let fixture: ComponentFixture<AppointmentTypesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentTypesListComponent]
    });
    fixture = TestBed.createComponent(AppointmentTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
