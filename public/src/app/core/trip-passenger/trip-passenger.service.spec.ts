import { TestBed } from '@angular/core/testing';

import { TripPassengerService } from './trip-passenger.service';

describe('TripService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripPassengerService = TestBed.inject(TripPassengerService);
    expect(service).toBeTruthy();
  });
});
