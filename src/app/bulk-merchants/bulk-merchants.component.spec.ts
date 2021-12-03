import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMerchantsComponent } from './bulk-merchants.component';

describe('BulkMerchantsComponent', () => {
  let component: BulkMerchantsComponent;
  let fixture: ComponentFixture<BulkMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
