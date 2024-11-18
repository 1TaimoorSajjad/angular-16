import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAreasListComponent } from './service-areas-list.component';

describe('ServiceAreasListComponent', () => {
  let component: ServiceAreasListComponent;
  let fixture: ComponentFixture<ServiceAreasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceAreasListComponent]
    });
    fixture = TestBed.createComponent(ServiceAreasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
