import { TestBed, inject } from '@angular/core/testing';

import { FcmService } from './fcm.service';

describe('FcmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FcmService]
    });
  });

  it('should ...', inject([FcmService], (service: FcmService) => {
    expect(service).toBeTruthy();
  }));
});
