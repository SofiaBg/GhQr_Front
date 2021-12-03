import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMerchantsValidationComponent } from './bulk-merchants-validation.component';

describe('BulkMerchantsValidationComponent', () => {
  let component: BulkMerchantsValidationComponent;
  let fixture: ComponentFixture<BulkMerchantsValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMerchantsValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMerchantsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
