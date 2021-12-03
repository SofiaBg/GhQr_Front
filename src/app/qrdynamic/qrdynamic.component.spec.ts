import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { qrdynamicComponent } from "./qrdynamic.component";

describe('qrdynamicComponent', () => {
  let component: qrdynamicComponent;
  let fixture: ComponentFixture<qrdynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ qrdynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(qrdynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
