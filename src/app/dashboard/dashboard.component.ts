import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from "@angular/material/card";
import { FlightsService } from '../services/flights.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

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
  private flightsService = inject(FlightsService);
  destinations = this.flightsService.destinations;
  destinationsAmount = computed(() => this.destinations().length);
  
  foundFlight(destination: string) {
    
    throw new Error('Method not implemented.');
  }
}
