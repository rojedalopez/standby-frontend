import { TestBed } from '@angular/core/testing';

import { MasterCacheService } from './mastercache.service';

describe('MastercacheService', () => {
  let service: MasterCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
