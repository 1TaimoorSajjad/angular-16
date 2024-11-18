import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddonsComponent } from './add-addons.component';

describe('AddAddonsComponent', () => {
  let component: AddAddonsComponent;
  let fixture: ComponentFixture<AddAddonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAddonsComponent]
    });
    fixture = TestBed.createComponent(AddAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
