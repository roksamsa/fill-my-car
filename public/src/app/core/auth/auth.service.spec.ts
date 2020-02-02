import { TestBed } from '@angular/core/testing';

import { FirebaseAuthService } from './auth.service';

describe('FirebaseAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseAuthService = TestBed.inject(FirebaseAuthService);
    expect(service).toBeTruthy();
  });
});
