import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewqrstaticComponent } from './new-qrstatic.component';

describe('NewqrstaticComponent', () => {
  let component: NewqrstaticComponent;
  let fixture: ComponentFixture<NewqrstaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewqrstaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewqrstaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
