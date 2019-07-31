/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlerftifyService } from './alerftify.service';

describe('Service: Alerftify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlerftifyService]
    });
  });

  it('should ...', inject([AlerftifyService], (service: AlerftifyService) => {
    expect(service).toBeTruthy();
  }));
});
