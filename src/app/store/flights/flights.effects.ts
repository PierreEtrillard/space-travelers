import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { FlightsActions } from './flights.actions';


@Injectable()
export class FlightsEffects {

  loadFlightss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FlightsActions.loadFlightss),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => FlightsActions.loadFlightssSuccess({ data })),
          catchError(error => of(FlightsActions.loadFlightssFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
