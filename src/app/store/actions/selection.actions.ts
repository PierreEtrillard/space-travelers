import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TargetedFlights } from '../../models/targeted-flights';
import { DateRange } from '@angular/material/datepicker';
import { AvailableDates } from '../../models/available-dates';


export const SelectionActions = createActionGroup({
  source: 'Selection',
  events: {
    'Change Selection': props<{ newSelection:TargetedFlights }>(),
    'Change Origin Selection': props<{ newOrigin:string }>(),
    'Change Destinations Selection': props<{ newDestinations:string[] }>(),
    'Load Possible Departures Success': props<{possibleDepartures:AvailableDates}>(),
    'Load Possible Departures Failure': props<{error:any}>(),
    'Load Possible Returns Success': props<{possibleReturns:AvailableDates}>(),
    'Load Possible Returns Failure': props<{error:any}>(),
    'Change Departure Date Selection': props<{ datesRange:DateRange<Date> }>(),
    'Change Return Date Selection': props<{ datesRange:DateRange<Date> }>(),
    'Set Simple Journey Selection': props<{ isSimpleJourney:boolean }>(),
    'Clear Selection': emptyProps(),
  }
});
