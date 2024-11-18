import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingSourcesListComponent } from './funding-sources-list.component';

describe('FundingSourcesListComponent', () => {
  let component: FundingSourcesListComponent;
  let fixture: ComponentFixture<FundingSourcesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundingSourcesListComponent]
    });
    fixture = TestBed.createComponent(FundingSourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
