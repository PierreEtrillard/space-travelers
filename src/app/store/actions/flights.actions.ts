import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FlightsSelector } from '../../models/flights-selector';
import { FlightsGroup } from '../../models/flights-group';
import { TargetedFlights } from '../../models/targeted-flights';

export const FlightsActions = createActionGroup({
  source: 'Flights/API',
  events: {
    'Count Flights': emptyProps(),
    'Count Flights Success': props<{flightsCount:number}>(),
    'Count Flights Failure': props<{error:any}>(),
    'Get Flights':  emptyProps(),
    'Get Flights Success': props<{ flightsGroups: FlightsGroup[] }>(),
    'Get Flights Failure': props<{ error: any }>(),
    'Clear Flights': emptyProps(),
  }
});
