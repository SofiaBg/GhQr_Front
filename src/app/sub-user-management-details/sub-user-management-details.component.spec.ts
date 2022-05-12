import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUserManagementDetailsComponent } from './sub-user-management-details.component';

describe('SubUserManagementDetailsComponent', () => {
  let component: SubUserManagementDetailsComponent;
  let fixture: ComponentFixture<SubUserManagementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUserManagementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUserManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
