// store/reducers/destination.reducer.ts
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { DestinationsActions } from './destinations.actions';
import { Destination } from '../../models/destination';


// Étape 1 : Définir l'interface de l'état
export interface DestinationState {
  destinations: Destination[];
  loading: boolean;
  error: any | null;
}

// Étape 2 : Déclarer un état initial
export const initialState: DestinationState = {
  destinations: [],
  loading: false,
  error: null,
};

// Étape 3 : Créer le reducer
export const destinationsReducer = createReducer(
  initialState,
  on(DestinationsActions.loadDestinations, (state) => ({
    ...state,
    loading: true,
  })),
  on(DestinationsActions.loadDestinationsSuccess, (state, { destinations }) =>({
    ...state,
    destinations, 
    loading: false,
    error:null    
  })
  ),
  on(DestinationsActions.loadDestinationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
// Étape 4 : Créer la feature et les sélecteurs associés
export const destinationsFeature = createFeature({
  name: 'destinationsFeature',
  reducer: destinationsReducer
});
