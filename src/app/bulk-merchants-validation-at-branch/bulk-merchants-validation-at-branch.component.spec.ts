import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMerchantsValidationAtBranchComponent } from './bulk-merchants-validation-at-branch.component';

describe('BulkMerchantsValidationAtBranchComponent', () => {
  let component: BulkMerchantsValidationAtBranchComponent;
  let fixture: ComponentFixture<BulkMerchantsValidationAtBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMerchantsValidationAtBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMerchantsValidationAtBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
