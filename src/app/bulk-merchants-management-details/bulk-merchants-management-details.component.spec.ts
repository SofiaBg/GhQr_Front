import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMerchantsManagementDetailsComponent } from './bulk-merchants-management-details.component';

describe('BulkMerchantsManagementDetailsComponent', () => {
  let component: BulkMerchantsManagementDetailsComponent;
  let fixture: ComponentFixture<BulkMerchantsManagementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMerchantsManagementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMerchantsManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
