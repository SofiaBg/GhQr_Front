import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllValidatedBulkMerchantsByBranchComponent } from './all-validated-bulk-merchants-by-branch.component';

describe('AllValidatedBulkMerchantsByBranchComponent', () => {
  let component: AllValidatedBulkMerchantsByBranchComponent;
  let fixture: ComponentFixture<AllValidatedBulkMerchantsByBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllValidatedBulkMerchantsByBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllValidatedBulkMerchantsByBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
