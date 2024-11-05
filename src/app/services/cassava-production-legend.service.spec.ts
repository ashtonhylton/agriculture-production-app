import { TestBed } from '@angular/core/testing';

import { CassavaProductionLegendService } from './cassava-production-legend.service';

describe('CassavaProductionLegendService', () => {
  let service: CassavaProductionLegendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CassavaProductionLegendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
