import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { destinationsFeature } from '../store/reducers/destinations.reducer';
import { Destination } from '../models/destination';
import { DestinationsActions } from '../store/actions/destinations.actions';
import { SelectionActions } from '../store/actions/selection.actions';
import { MatListModule } from '@angular/material/list';
import { HeaderUtilService } from '../services/header-util.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatListModule,MatButtonModule, MatCardModule, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  picsUrl = `${environment.apiUrl}/files/`;
  loading = signal(true);

  private store = inject(Store);
  private router = inject(Router);
  private headerService = inject(HeaderUtilService);

  readonly destinations = this.store.selectSignal(
    destinationsFeature.selectDestinations
  );
  constructor() {
    // Déclencher le chargement des données
    this.store.dispatch(DestinationsActions.loadDestinations());
    effect(()=>{
    if (this.destinations().length) {
      this.headerService.subtitle.set(`Envolez vous vers les ${this.destinations().length - 1} destinations les plus prisées du système solaire`)
    }
  },{allowSignalWrites:true})
  }
  foundFlight(destination: string) {
    this.store.dispatch(
      SelectionActions.changeDestinationsSelection({
        newDestinations: [destination],
      })
    );
    this.router.navigateByUrl('flights');
  }
}
