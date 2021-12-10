import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMerchantsManagementListComponent } from './bulk-merchants-management-list.component';

describe('BulkMerchantsManagementListComponent', () => {
  let component: BulkMerchantsManagementListComponent;
  let fixture: ComponentFixture<BulkMerchantsManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMerchantsManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMerchantsManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
