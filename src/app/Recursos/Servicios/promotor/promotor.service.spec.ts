import { TestBed } from '@angular/core/testing';

import { PromotorService } from './promotor.service';

describe('PromotorService', () => {
  let service: PromotorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
