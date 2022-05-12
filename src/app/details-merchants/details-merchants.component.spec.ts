import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMerchantsComponent } from './details-merchants.component';

describe('DetailsMerchantsComponent', () => {
  let component: DetailsMerchantsComponent;
  let fixture: ComponentFixture<DetailsMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
