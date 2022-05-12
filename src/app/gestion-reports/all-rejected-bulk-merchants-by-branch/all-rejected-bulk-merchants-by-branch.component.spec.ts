import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRejectedBulkMerchantsByBranchComponent } from './all-rejected-bulk-merchants-by-branch.component';

describe('AllRejectedBulkMerchantsByBranchComponent', () => {
  let component: AllRejectedBulkMerchantsByBranchComponent;
  let fixture: ComponentFixture<AllRejectedBulkMerchantsByBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRejectedBulkMerchantsByBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRejectedBulkMerchantsByBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
