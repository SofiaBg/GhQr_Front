import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUserManagementComponent } from './sub-user-management.component';

describe('SubUserManagementComponent', () => {
  let component: SubUserManagementComponent;
  let fixture: ComponentFixture<SubUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
