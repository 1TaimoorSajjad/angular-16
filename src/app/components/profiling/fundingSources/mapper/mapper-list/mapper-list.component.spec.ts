import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperListComponent } from './mapper-list.component';

describe('MapperListComponent', () => {
  let component: MapperListComponent;
  let fixture: ComponentFixture<MapperListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapperListComponent]
    });
    fixture = TestBed.createComponent(MapperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
