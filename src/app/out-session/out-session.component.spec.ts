import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutSessionComponent } from './out-session.component';

describe('OutSessionComponent', () => {
  let component: OutSessionComponent;
  let fixture: ComponentFixture<OutSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
