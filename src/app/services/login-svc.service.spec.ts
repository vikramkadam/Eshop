import { TestBed } from '@angular/core/testing';

import { LoginSvcService } from './login-svc.service';

describe('LoginSvcService', () => {
  let service: LoginSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
