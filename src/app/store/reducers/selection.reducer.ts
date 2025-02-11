import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { SelectionActions } from '../actions/selection.actions';
import { TargetedFlights } from '../../models/targeted-flights';

export interface SelectionState {
  selectionDetails: TargetedFlights;
  isRequestable: boolean;
  error: any | null;
  takeOffDepartureDates: Date[];
  takeOffReturnDates: Date[];
}
export const initialState: SelectionState = {
  selectionDetails: {
    class: '',
    passengers: 0,
    origin: '',
    destinations: [],
    singleJourney: false,
    departureDateRange: null,
    arrivalDateRange: null,
  },
  isRequestable: false,
  takeOffDepartureDates: [],
  takeOffReturnDates: [],
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
  on(SelectionActions.changeArrivalDateSelection, (state, { datesRange }) => ({
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
