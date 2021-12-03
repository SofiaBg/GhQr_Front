import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMerchantComponent } from './update-merchant.component';

describe('NewMerchantComponent', () => {
  let component: NewMerchantComponent;
  let fixture: ComponentFixture<NewMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
