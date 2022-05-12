import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActivatedMerchantsComponent } from './all-activated-merchants.component';

describe('AllActivatedMerchantsComponent', () => {
  let component: AllActivatedMerchantsComponent;
  let fixture: ComponentFixture<AllActivatedMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllActivatedMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllActivatedMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
