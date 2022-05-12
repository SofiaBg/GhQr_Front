import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReportsComponent } from './gestion-reports.component';

describe('GestionReportsComponent', () => {
  let component: GestionReportsComponent;
  let fixture: ComponentFixture<GestionReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
