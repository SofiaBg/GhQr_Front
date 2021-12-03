import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewqrdynamiComponent } from './new-qrdynamic.component';

describe('NewqrdynamiComponent', () => {
  let component: NewqrdynamiComponent;
  let fixture: ComponentFixture<NewqrdynamiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewqrdynamiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewqrdynamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
