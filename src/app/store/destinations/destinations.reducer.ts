// store/reducers/destination.reducer.ts
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { DestinationsActions} from "./destinations.actions";
import { Destination } from '../../models/destination';

// Étape 1 : Créer un adapter pour gérer les entités
export const destinationAdapter: EntityAdapter<Destination> = createEntityAdapter<Destination>();

// Étape 2 : Définir l'interface de l'état
export interface DestinationState extends EntityState<Destination> {
  loading: boolean;
  error: any;
}

// Étape 3 : État initial
export const initialState: DestinationState = destinationAdapter.getInitialState({
  loading: false,
  error: null,
});

// Étape 4 : Créer le reducer
export const destinationsReducer = createReducer(
  initialState,
  on(DestinationsActions.loadDestinations, (state) => ({ ...state, loading: true })),
  on(DestinationsActions.loadDestinationsSuccess, (state, { destinations }) =>
    destinationAdapter.setAll(destinations, { ...state, loading: false })
  ),
  on(DestinationsActions.loadDestinationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
// Étape 5 : Créer la feature et les sélecteurs associés
export const destinationsFeature = createFeature({
  name: 'destinations',
  reducer: destinationsReducer,
  extraSelectors: ({ selectDestinationsState }) => ({
    ...destinationAdapter.getSelectors(selectDestinationsState),
    selectLoading: (state: { loading: any; }) => state.loading,
    selectError: (state: { error: any; }) => state.error,
  }),
});
