import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTripReservationComponent } from './cancel-trip-reservation.component';

describe('CancelTripReservationComponent', () => {
  let component: CancelTripReservationComponent;
  let fixture: ComponentFixture<CancelTripReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelTripReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelTripReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
