import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Selection } from './selection.model';
import { SelectionActions } from './selection.actions';

export const selectionsFeatureKey = 'selections';

export interface State extends EntityState<Selection> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Selection> = createEntityAdapter<Selection>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(SelectionActions.addSelection,
    (state, action) => adapter.addOne(action.selection, state)
  ),
  on(SelectionActions.upsertSelection,
    (state, action) => adapter.upsertOne(action.selection, state)
  ),
  on(SelectionActions.addSelections,
    (state, action) => adapter.addMany(action.selections, state)
  ),
  on(SelectionActions.upsertSelections,
    (state, action) => adapter.upsertMany(action.selections, state)
  ),
  on(SelectionActions.updateSelection,
    (state, action) => adapter.updateOne(action.selection, state)
  ),
  on(SelectionActions.updateSelections,
    (state, action) => adapter.updateMany(action.selections, state)
  ),
  on(SelectionActions.deleteSelection,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(SelectionActions.deleteSelections,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(SelectionActions.loadSelections,
    (state, action) => adapter.setAll(action.selections, state)
  ),
  on(SelectionActions.clearSelections,
    state => adapter.removeAll(state)
  ),
);

export const selectionsFeature = createFeature({
  name: selectionsFeatureKey,
  reducer,
  extraSelectors: ({ selectSelectionsState }) => ({
    ...adapter.getSelectors(selectSelectionsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = selectionsFeature;
