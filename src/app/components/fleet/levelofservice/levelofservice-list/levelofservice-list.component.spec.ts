import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelofserviceListComponent } from './levelofservice-list.component';

describe('LevelofserviceListComponent', () => {
  let component: LevelofserviceListComponent;
  let fixture: ComponentFixture<LevelofserviceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelofserviceListComponent]
    });
    fixture = TestBed.createComponent(LevelofserviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
