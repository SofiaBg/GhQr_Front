import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSingleBulkMerchantComponent } from './create-single-bulk-merchant.component';

describe('CreateSingleBulkMerchantComponent', () => {
  let component: CreateSingleBulkMerchantComponent;
  let fixture: ComponentFixture<CreateSingleBulkMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSingleBulkMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSingleBulkMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
