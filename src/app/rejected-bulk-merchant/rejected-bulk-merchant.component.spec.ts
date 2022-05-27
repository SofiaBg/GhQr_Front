import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedBulkMerchantComponent } from './rejected-bulk-merchant.component';

describe('RejectedBulkMerchantComponent', () => {
  let component: RejectedBulkMerchantComponent;
  let fixture: ComponentFixture<RejectedBulkMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedBulkMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedBulkMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
