import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Destination } from '../../models/destination';


export const DestinationsActions = createActionGroup({
  source: 'Destination/API',
  events: {
    'Load Destinations': emptyProps(),
    'Load Destinations Success': props<{ destinations: Destination[] }>(),
    'Load Destinations Failure': props<{ error:any }>()
  }
});
