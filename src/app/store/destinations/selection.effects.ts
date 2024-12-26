import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { SelectionActions } from './selection.actions';

@Injectable()
export class SelectionEffects {


  selSelections$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SelectionActions.selSelections),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
