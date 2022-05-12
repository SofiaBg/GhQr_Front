import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPendingBulkMerchantsComponent } from './all-pending-bulk-merchants.component';

describe('AllPendingBulkMerchantsComponent', () => {
  let component: AllPendingBulkMerchantsComponent;
  let fixture: ComponentFixture<AllPendingBulkMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPendingBulkMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPendingBulkMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
