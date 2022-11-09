import { TestBed } from '@angular/core/testing';

import { CategoreisService } from './categoreis.service';

describe('CategoreisService', () => {
  let service: CategoreisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoreisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
