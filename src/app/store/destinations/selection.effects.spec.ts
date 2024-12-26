import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SelectionEffects } from './selection.effects';

describe('SelectionEffects', () => {
  let actions$: Observable<any>;
  let effects: SelectionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SelectionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SelectionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
