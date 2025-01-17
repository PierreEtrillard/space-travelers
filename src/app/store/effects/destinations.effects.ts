import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { FlightsService } from '../../services/flights.service';
import { DestinationsActions } from '../actions/destinations.actions';
import { Store } from '@ngrx/store';
import { SelectionActions } from '../actions/selection.actions';

export const loadDestinations$ = createEffect(
  (actions$ = inject(Actions), flightsService = inject(FlightsService), selectionStore = inject(Store)) => {
    return actions$.pipe(
      ofType(DestinationsActions.loadDestinations),
      mergeMap(() =>
        flightsService.destinations$.pipe(
          map((destinations) =>{
            const [takeOffBase] = destinations;// récupére la première entrée des destinations
            selectionStore.dispatch(SelectionActions.changeOriginSelection({newOrigin:takeOffBase.name})) 
            return DestinationsActions.loadDestinationsSuccess({ destinations })

          }
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
