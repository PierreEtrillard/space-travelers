import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Destination } from '../../models/destination';


export const DestinationsActions = createActionGroup({
  source: 'Destination/API',
  events: {
    'Load Destinations':emptyProps(),
    'Load Destinations Success': props<{ destinations: Destination[] }>(),
    'Load Destinations Failure': props<{ error:any }>(),
    // 'Add Destination': props<{ destination: Destination }>(),
    // 'Upsert Destination': props<{ destination: Destination }>(),
    // 'Add Destinations': props<{ destinations: Destination[] }>(),
    // 'Upsert Destinations': props<{ destinations: Destination[] }>(),
    // 'Update Destination': props<{ destination: Update<Destination> }>(),
    // 'Update Destinations': props<{ destinations: Update<Destination>[] }>(),
    // 'Delete Destination': props<{ id: string }>(),
    // 'Delete Destinations': props<{ ids: string[] }>(),
    // 'Clear Destinations': emptyProps(),
  }
});
