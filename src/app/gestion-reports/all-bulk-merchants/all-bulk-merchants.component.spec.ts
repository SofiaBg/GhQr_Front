import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBulkMerchantsComponent } from './all-bulk-merchants.component';

describe('AllBulkMerchantsComponent', () => {
  let component: AllBulkMerchantsComponent;
  let fixture: ComponentFixture<AllBulkMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBulkMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBulkMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
