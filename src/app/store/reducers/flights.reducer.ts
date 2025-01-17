import { createFeature, createReducer, on } from '@ngrx/store';
import { FlightsActions } from '../actions/flights.actions';
import { FlightsGroup } from '../../models/flights-group';

export const flightsFeatureKey = 'flightsFeature';

export interface State {
  flightsGroups: FlightsGroup[];
  loading: boolean;
  registredFlights: number | null;
  error: null | any;
}

export const initialState: State = {
  flightsGroups: [],
  loading: false,
  registredFlights: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(FlightsActions.countFlights, (state) => ({
    ...state,
    loading: true,
  })),
  on(FlightsActions.countFlightsSuccess, (state, response) => ({
    ...state,
    registredFlights: response.flightsCount,
    loading: false,
    error:null
  })),
  on(FlightsActions.countFlightsFailure, (state, response) => ({
    ...state,
    error: response.error,
    loading: false,
  })),
  on(FlightsActions.getFlights, (state) => ({ ...state, loading: true })),
  on(FlightsActions.getFlightsSuccess, (state, response) => ({
    ...state,
    flightsGroups:response.flightsGroups,
    loading:false,
    error:null
  })
  ),
  on(FlightsActions.clearFlights, (state) => ({...initialState,registredFlights:state.registredFlights}))
);

export const flightsFeature = createFeature({
  name: flightsFeatureKey,
  reducer
});
