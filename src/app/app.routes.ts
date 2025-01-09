import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FlightComponent } from './flights/flight/flight.component';
import { provideState } from '@ngrx/store';
import { flightsFeature } from './store/reducers/flights.reducer';
import  * as flightsEffects  from "./store/effects/flights.effects";
import { provideEffects } from '@ngrx/effects';
export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'flights',
    loadComponent: () =>
      import('./flights/flights.component').then((m) => m.FlightsComponent),
    providers: [provideState(flightsFeature),provideEffects(flightsEffects)],
  },
  {
    path: 'flights/flight/:id',
    component: FlightComponent,

  },
  { path: '**', component: NotFoundComponent },
];
