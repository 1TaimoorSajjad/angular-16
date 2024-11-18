import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceTypesListComponent } from './space-types-list.component';

describe('SpaceTypesListComponent', () => {
  let component: SpaceTypesListComponent;
  let fixture: ComponentFixture<SpaceTypesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpaceTypesListComponent]
    });
    fixture = TestBed.createComponent(SpaceTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
