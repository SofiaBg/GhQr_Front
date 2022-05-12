import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUserManagementCreationComponent } from './sub-user-management-creation.component';

describe('SubUserManagementCreationComponent', () => {
  let component: SubUserManagementCreationComponent;
  let fixture: ComponentFixture<SubUserManagementCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUserManagementCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUserManagementCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
