import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { qrTransactionComponent } from './qrtransaction.component';

describe('qrTransactionComponent', () => {
  let component: qrTransactionComponent;
  let fixture: ComponentFixture<qrTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ qrTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(qrTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
