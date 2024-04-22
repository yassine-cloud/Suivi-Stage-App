import { TestBed } from '@angular/core/testing';

import { LivretService } from './livret.service';

describe('LivretService', () => {
  let service: LivretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
