import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DestinationsActions } from './destinations.actions';
import { FlightsService } from '../../services/flights.service';

export const loadDestinations$ = createEffect(
  (actions$ = inject(Actions), flightsService = inject(FlightsService)) => {
    return actions$.pipe(
      ofType(DestinationsActions.loadDestinations),
      mergeMap(() =>
        flightsService.destinations$.pipe(
          map((destinations) =>
            DestinationsActions.loadDestinationsSuccess({ destinations })
          ),
          catchError((error) =>
            of(DestinationsActions.loadDestinationsFailure({ error }))
          )
        )
      )
    );
  },
  {functional:true}
);
