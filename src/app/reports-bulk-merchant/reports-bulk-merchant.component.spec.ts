import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBulkMerchantComponent } from './reports-bulk-merchant.component';

describe('ReportsBulkMerchantComponent', () => {
  let component: ReportsBulkMerchantComponent;
  let fixture: ComponentFixture<ReportsBulkMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsBulkMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsBulkMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
