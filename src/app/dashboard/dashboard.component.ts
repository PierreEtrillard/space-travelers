import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from "@angular/material/card";
import { FlightsService } from '../services/flights.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { destinationsFeature } from '../store/destinations/destinations.reducer';
import { Destination } from '../models/destination';
import { DestinationsActions } from '../store/destinations/destinations.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  picsUrl = `${environment.apiUrl}/files/`
  loading =signal(true);
  private store =inject(Store);
  readonly destinations =  this.store.selectSignal(destinationsFeature.selectDestinations);
  readonly destinationsAmount = computed(()=>this.destinations().length);
  constructor() {
    // Déclencher le chargement des données
    this.store.dispatch(DestinationsActions.loadDestinations());
  }
  foundFlight(destination: string) {
    
    throw new Error('Method not implemented.');
  }
}

