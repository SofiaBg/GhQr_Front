import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRejectedBulkMerchantsAByBranchComponent } from './all-rejected-bulk-merchants-a-by-branch.component';

describe('AllRejectedBulkMerchantsAByBranchComponent', () => {
  let component: AllRejectedBulkMerchantsAByBranchComponent;
  let fixture: ComponentFixture<AllRejectedBulkMerchantsAByBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRejectedBulkMerchantsAByBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRejectedBulkMerchantsAByBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
