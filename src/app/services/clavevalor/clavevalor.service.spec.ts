import { TestBed } from '@angular/core/testing';

import { ClaveValorService } from './clavevalor.service';

describe('ClavevalorService', () => {
  let service: ClaveValorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaveValorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
