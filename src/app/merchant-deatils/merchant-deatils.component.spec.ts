import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantDeatilsComponent } from './merchant-deatils.component';

describe('MerchantDeatilsComponent', () => {
  let component: MerchantDeatilsComponent;
  let fixture: ComponentFixture<MerchantDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
