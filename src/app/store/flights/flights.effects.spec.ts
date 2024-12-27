import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FlightsEffects } from './flights.effects';

describe('FlightsEffects', () => {
  let actions$: Observable<any>;
  let effects: FlightsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlightsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FlightsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
