import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import {ISADMINGuard} from './isadmin.guard';

describe('isadminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => ISADMINGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
