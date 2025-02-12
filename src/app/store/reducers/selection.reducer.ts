import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { SelectionActions } from '../actions/selection.actions';
import { TargetedFlights } from '../../models/targeted-flights';
import { AvailableDates } from '../../models/available-dates';

export interface SelectionState {
  selectionDetails: TargetedFlights;
  isRequestable: boolean;
  possibleDepartureDates: AvailableDates;
  possibleReturnDates: AvailableDates;
  error: any | null;
}
export const initialState: SelectionState = {
  selectionDetails: {
    class: '',
    passengers: 0,
    origin: '',
    destinations: [],
    singleJourney: false,
    departureDateRange: null,
    returnDateRange: null,
  },
  isRequestable: false,
  possibleDepartureDates: [],
  possibleReturnDates: [],
  error: null,
};
export const selectionReducer = createReducer(
  initialState,
  on(SelectionActions.changeSelection, (state, selection) => ({
    ...state,
    ...selection,
  })),
  on(SelectionActions.changeOriginSelection, (state, { newOrigin }) => ({
    ...state,
    selectionDetails: { ...state.selectionDetails, origin: newOrigin },
  })),
  on(SelectionActions.changeOriginSelection, (state, { newOrigin }) => ({
    ...state,
    selectionDetails: { ...state.selectionDetails, origin: newOrigin },
  })),
  on(SelectionActions.loadPossibleDeparturesSuccess, (state, { possibleDepartures }) => ({
    ...state,
    possibleDepartureDates: possibleDepartures,
  })),
  on(SelectionActions.loadPossibleReturnsSuccess, (state, { possibleReturns }) => ({
    ...state,
    possibleReturnDates: possibleReturns,
  })),
  on(
    SelectionActions.changeDepartureDateSelection,
    (state, { datesRange }) => ({
      ...state,
      selectionDetails: {
        ...state.selectionDetails,
        departureDateRange: datesRange,
      },
    })
  ),
  on(
    SelectionActions.changeDestinationsSelection,
    (state, { newDestinations }) => ({
      ...state,
      selectionDetails: {
        ...state.selectionDetails,
        destinations: newDestinations,
      },
    })
  ),
  on(SelectionActions.changeReturnDateSelection, (state, { datesRange }) => ({
    ...state,
    selectionDetails: {
      ...state.selectionDetails,
      returnDateRange: datesRange,
    },
  })),
  on(SelectionActions.setSimpleJourneySelection, (state, value) => ({
    ...state,
    selectionDetails: {
      ...state.selectionDetails,
      simpleJourney: value.isSimpleJourney,
    },
  })),
  on(SelectionActions.clearSelection, () => initialState)
);

export const selectionFeature = createFeature({
  name: 'selectionFeature',
  reducer: selectionReducer,
});
