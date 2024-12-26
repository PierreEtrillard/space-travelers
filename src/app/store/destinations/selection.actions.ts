import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Selection } from './selection.model';

export const SelectionActions = createActionGroup({
  source: 'Selection/API',
  events: {
    'Load Selections': props<{ selections: Selection[] }>(),
    'Add Selection': props<{ selection: Selection }>(),
    'Upsert Selection': props<{ selection: Selection }>(),
    'Add Selections': props<{ selections: Selection[] }>(),
    'Upsert Selections': props<{ selections: Selection[] }>(),
    'Update Selection': props<{ selection: Update<Selection> }>(),
    'Update Selections': props<{ selections: Update<Selection>[] }>(),
    'Delete Selection': props<{ id: string }>(),
    'Delete Selections': props<{ ids: string[] }>(),
    'Clear Selections': emptyProps(),
  }
});
