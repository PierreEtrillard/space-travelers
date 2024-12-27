import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Flights } from './flights.model';

export const FlightsActions = createActionGroup({
  source: 'Flights/API',
  events: {
    'Load Flights': props<{ flights: Flights[] }>(),
    'Add Flight': props<{ flight: Flights }>(),
    'Upsert Flight': props<{ flights: Flights }>(),
    'Add Flights': props<{ flights: Flights[] }>(),
    'Upsert Flights': props<{ flights: Flights[] }>(),
    'Update Flight': props<{ flight: Update<Flights> }>(),
    'Update Flights': props<{ flights: Update<Flights>[] }>(),
    'Delete Flight': props<{ id: string }>(),
    'Delete Flights': props<{ ids: string[] }>(),
    'Clear Flights': emptyProps(),
  }
});
