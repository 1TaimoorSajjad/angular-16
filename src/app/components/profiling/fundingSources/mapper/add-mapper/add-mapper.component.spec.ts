import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMapperComponent } from './add-mapper.component';

describe('AddMapperComponent', () => {
  let component: AddMapperComponent;
  let fixture: ComponentFixture<AddMapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMapperComponent]
    });
    fixture = TestBed.createComponent(AddMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
