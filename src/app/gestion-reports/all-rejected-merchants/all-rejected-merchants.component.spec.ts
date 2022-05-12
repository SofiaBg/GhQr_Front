import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRejectedMerchantsComponent } from './all-rejected-merchants.component';

describe('AllRejectedMerchantsComponent', () => {
  let component: AllRejectedMerchantsComponent;
  let fixture: ComponentFixture<AllRejectedMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRejectedMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRejectedMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
