import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { FlightsActions } from '../actions/flights.actions';
import { FlightsService } from '../../services/flights.service';
import { FlightsGroup } from '../../models/flights-group';
import { Store } from '@ngrx/store';

export const getFlights$ = createEffect(
  (
    actions$ = inject(Actions),
    flightsService = inject(FlightsService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(FlightsActions.getFlights),
      switchMap(() =>
        flightsService.getflights$.pipe(
          map((flightsGroups: FlightsGroup[]) => {
            return FlightsActions.getFlightsSuccess({ flightsGroups });
          }),
          catchError((error) => of(FlightsActions.getFlightsFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
export const countFlights$ = createEffect(
  (actions$ = inject(Actions), flightsService = inject(FlightsService)) => {
    return actions$.pipe(
      ofType(FlightsActions.countFlights),
      switchMap(() =>
        flightsService.countFlightsRegistred$.pipe(
          map((count) => {
            return FlightsActions.countFlightsSuccess({ flightsCount: count });
          }),
          catchError((error)=> of(FlightsActions.countFlightsFailure({error})))
        )
      )
    );
  },
  { functional: true }
);
