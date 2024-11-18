import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevelofserviceComponent } from './add-levelofservice.component';

describe('AddLevelofserviceComponent', () => {
  let component: AddLevelofserviceComponent;
  let fixture: ComponentFixture<AddLevelofserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLevelofserviceComponent]
    });
    fixture = TestBed.createComponent(AddLevelofserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
