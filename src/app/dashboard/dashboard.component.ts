import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from '@angular/material/sidenav';
import { toSignal } from '@angular/core/rxjs-interop';
import { FlightsService } from '../services/flights.service';
import { catchError, Observable, of } from 'rxjs';
import { Destination } from '../models/destination';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent  {
  destinations$: Observable<Destination[]>;

  constructor(private flightsService: FlightsService) {
    // Initialisation de l'observable directement dans le constructeur
    this.destinations$ = this.getDestinations();
  }
  getDestinations(): Observable<Destination[]> {
    // Appel direct au service pour obtenir les destinations
    return this.flightsService.getDestinations();
  }
}
