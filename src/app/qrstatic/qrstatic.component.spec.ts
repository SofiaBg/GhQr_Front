import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { qrstaticComponent } from "./qrstatic.component";

describe('qrstaticComponent', () => {
  let component: qrstaticComponent;
  let fixture: ComponentFixture<qrstaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ qrstaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(qrstaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
