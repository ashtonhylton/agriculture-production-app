import { TestBed } from '@angular/core/testing';

import { GeotiffService } from './geotiff.service';

describe('GeotiffService', () => {
  let service: GeotiffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeotiffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
