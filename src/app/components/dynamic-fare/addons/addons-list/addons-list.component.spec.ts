import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonsListComponent } from './addons-list.component';

describe('AddonsListComponent', () => {
  let component: AddonsListComponent;
  let fixture: ComponentFixture<AddonsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddonsListComponent]
    });
    fixture = TestBed.createComponent(AddonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
