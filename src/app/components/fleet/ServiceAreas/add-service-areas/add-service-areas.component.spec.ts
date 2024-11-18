import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceAreasComponent } from './add-service-areas.component';

describe('AddServiceAreasComponent', () => {
  let component: AddServiceAreasComponent;
  let fixture: ComponentFixture<AddServiceAreasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddServiceAreasComponent]
    });
    fixture = TestBed.createComponent(AddServiceAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
