import { TestBed } from '@angular/core/testing';

import { SendEmailService } from './send-email.service';

describe('SendMailServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendEmailService = TestBed.inject(SendEmailService);
    expect(service).toBeTruthy();
  });
});
