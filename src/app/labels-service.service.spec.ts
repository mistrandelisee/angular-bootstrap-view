import { TestBed } from '@angular/core/testing';

import { LabelsServiceService } from './labels-service.service';

describe('LabelsServiceService', () => {
  let service: LabelsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
