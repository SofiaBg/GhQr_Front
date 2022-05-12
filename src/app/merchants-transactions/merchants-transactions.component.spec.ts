import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsTransactionsComponent } from './merchants-transactions.component';

describe('MerchantsTransactionsComponent', () => {
  let component: MerchantsTransactionsComponent;
  let fixture: ComponentFixture<MerchantsTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantsTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
