import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllValidatedMerchantsComponent } from './all-validated-merchants.component';

describe('AllValidatedMerchantsComponent', () => {
  let component: AllValidatedMerchantsComponent;
  let fixture: ComponentFixture<AllValidatedMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllValidatedMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllValidatedMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
