import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TargetedFlights } from '../../models/targeted-flights';
import { DateRange } from '@angular/material/datepicker';


export const SelectionActions = createActionGroup({
  source: 'Selection',
  events: {
    'Change Selection': props<{ newSelection:TargetedFlights }>(),
    'Change Origin Selection': props<{ newOrigin:string }>(),
    'Change Departure Date Selection': props<{ datesRange:DateRange<Date> }>(),
    'Change Destinations Selection': props<{ newDestinations:string[] }>(),
    'Change Arrival Date Selection': props<{ datesRange:DateRange<Date> }>(),
    'Set Simple Journey Selection': props<{ isSimpleJourney:boolean }>(),
    'Clear Selection': emptyProps(),
  }
});
