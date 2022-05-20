import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSingleMerchantComponent } from './new-single-merchant.component';

describe('NewSingleMerchantComponent', () => {
  let component: NewSingleMerchantComponent;
  let fixture: ComponentFixture<NewSingleMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSingleMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSingleMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
