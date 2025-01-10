import { Component, effect, inject } from '@angular/core';
import { SelectorPannelComponent } from './selector-pannel/selector-pannel/selector-pannel.component';
import { FlightsGridComponent } from './flights-grid/flights-grid.component';
import { HeaderUtilService } from '../services/header-util.service';
import { Store } from '@ngrx/store';
import { FlightsActions } from '../store/actions/flights.actions';
import { selectionFeature } from '../store/reducers/selection.reducer';
import { flightsFeature } from '../store/reducers/flights.reducer';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [SelectorPannelComponent, FlightsGridComponent],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent {
  store = inject(Store);
  registredFlights = this.store.selectSignal(
    flightsFeature.selectRegistredFlights
  );
  constructor(private headerService: HeaderUtilService) {
    this.store.dispatch(FlightsActions.countFlights());
    effect(() => {
      if (this.registredFlights()) {        
        this.headerService.subtitle.set(
          `Laissez vous surprendre avec nos ${this.registredFlights()} vols actuellement programmés !`
        );
      }
    },{allowSignalWrites:true});
  }
}
