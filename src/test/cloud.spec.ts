import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CloudService } from '../iotile/cloud.service';

describe('CloudService (Mocked)', () => {
/*
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CloudService,

        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should construct', async(inject(
    [CloudService, MockBackend], (service, mockBackend) => {

    expect(service).toBeDefined();
  })));
*/
});