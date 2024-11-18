import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFundingSourcesComponent } from './add-funding-sources.component';

describe('AddFundingSourcesComponent', () => {
  let component: AddFundingSourcesComponent;
  let fixture: ComponentFixture<AddFundingSourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFundingSourcesComponent]
    });
    fixture = TestBed.createComponent(AddFundingSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
