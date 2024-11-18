import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpaceTypesComponent } from './add-space-types.component';

describe('AddSpaceTypesComponent', () => {
  let component: AddSpaceTypesComponent;
  let fixture: ComponentFixture<AddSpaceTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSpaceTypesComponent]
    });
    fixture = TestBed.createComponent(AddSpaceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
