import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Flights } from './flights.model';
import { FlightsActions } from './flights.actions';

export const flightsesFeatureKey = 'flights';

export interface State extends EntityState<Flights> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Flights> = createEntityAdapter<Flights>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(FlightsActions.addFlight,
    (state, action) => adapter.addOne(action.flight, state)
  ),
  on(FlightsActions.upsertFlight,
    (state, action) => adapter.upsertOne(action.flights, state)
  ),
  on(FlightsActions.addFlights,
    (state, action) => adapter.addMany(action.flights, state)
  ),
  on(FlightsActions.upsertFlights,
    (state, action) => adapter.upsertMany(action.flights, state)
  ),
  on(FlightsActions.updateFlight,
    (state, action) => adapter.updateOne(action.flight, state)
  ),
  on(FlightsActions.updateFlights,
    (state, action) => adapter.updateMany(action.flights, state)
  ),
  on(FlightsActions.deleteFlight,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(FlightsActions.deleteFlights,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(FlightsActions.loadFlights,
    (state, action) => adapter.setAll(action.flights, state)
  ),
  on(FlightsActions.clearFlights,
    state => adapter.removeAll(state)
  ),
);

export const flightsesFeature = createFeature({
  name: flightsesFeatureKey,
  reducer,
  extraSelectors: ({ selectFlightsState }) => ({
    ...adapter.getSelectors(selectFlightsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = flightsesFeature;
