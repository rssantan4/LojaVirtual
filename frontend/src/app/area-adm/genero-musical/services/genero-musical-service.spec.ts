import { TestBed } from '@angular/core/testing';

import { GeneroMusicalService } from './genero-musical-service';

describe('GeneroMusicalService', () => {
  let service: GeneroMusicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneroMusicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
