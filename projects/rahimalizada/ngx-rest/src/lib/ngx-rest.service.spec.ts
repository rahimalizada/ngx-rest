import { TestBed } from '@angular/core/testing';

import { NgxRestService } from './ngx-rest.service';

describe('NgxRestService', () => {
  let service: NgxRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
