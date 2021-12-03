import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NStransactionComponent } from './nstransaction.component';

describe('NStransactionComponent', () => {
  let component: NStransactionComponent;
  let fixture: ComponentFixture<NStransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NStransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NStransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
