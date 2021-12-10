import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMerchantsManagementCreationComponent } from './bulk-merchants-management-creation.component';

describe('BulkMerchantsManagementCreationComponent', () => {
  let component: BulkMerchantsManagementCreationComponent;
  let fixture: ComponentFixture<BulkMerchantsManagementCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMerchantsManagementCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMerchantsManagementCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
