import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSuspendedMerchantsComponent } from './all-suspended-merchants.component';

describe('AllSuspendedMerchantsComponent', () => {
  let component: AllSuspendedMerchantsComponent;
  let fixture: ComponentFixture<AllSuspendedMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSuspendedMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSuspendedMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
