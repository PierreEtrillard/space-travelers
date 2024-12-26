import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DestinationEffects } from './destinations.effects';

describe('DestinationEffects', () => {
  let actions$: Observable<any>;
  let effects: DestinationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DestinationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DestinationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
