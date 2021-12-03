import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { qrComponent } from "./qr.component";

describe('qrComponent', () => {
  let component: qrComponent;
  let fixture: ComponentFixture<qrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ qrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(qrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
