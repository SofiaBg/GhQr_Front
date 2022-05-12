import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllValidatedBulkMerchantsByBranchAComponent } from './all-validated-bulk-merchants-by-branch-a.component';

describe('AllValidatedBulkMerchantsByBranchAComponent', () => {
  let component: AllValidatedBulkMerchantsByBranchAComponent;
  let fixture: ComponentFixture<AllValidatedBulkMerchantsByBranchAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllValidatedBulkMerchantsByBranchAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllValidatedBulkMerchantsByBranchAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
