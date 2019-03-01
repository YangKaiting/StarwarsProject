import { TestBed } from '@angular/core/testing';

import { StarWarsService } from './starwars.service';

describe('StarWarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarWarsService = TestBed.get(StarWarsService);
    expect(service).toBeTruthy();
  });
});
