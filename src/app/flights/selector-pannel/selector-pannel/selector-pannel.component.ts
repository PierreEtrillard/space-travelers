import {
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectionFeature } from '../../../store/reducers/selection.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { SelectionActions } from '../../../store/actions/selection.actions';
import { FormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FlightsService } from '../../../services/flights.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { concatMap, flatMap, forkJoin, from, map, mergeMap, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { __importDefault } from 'tslib';
import { CommonModule } from '@angular/common';
import { destinationsFeature } from '../../../store/reducers/destinations.reducer';
import { DestinationsActions } from '../../../store/actions/destinations.actions';
@Component({
  selector: 'app-selector-pannel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  templateUrl: './selector-pannel.component.html',
  styleUrl: './selector-pannel.component.scss',
})
export class SelectorPannelComponent {
  store = inject(Store);
  flightsService = inject(FlightsService);
  stations = this.store.selectSignal(destinationsFeature.selectDestinations)
  firstTakeOff = new Date(2350, 0, 1);
  selectionState = this.store.selectSignal(
    selectionFeature.selectSelectionDetails
  );
  availableDepartureDates=signal<Date[]>([])

  availableReturnDates=signal<Date[]>([])
  readyToSend = this.store.selectSignal(selectionFeature.selectIsRequestable);
  selectionForm = {
    class: this.selectionState().class,
    passengers: 1,
    origin: this.selectionState().origin,
    destinations: this.selectionState().destinations,
    departureDate: this.availableDepartureDates()[0],
    departureVariation: 1,
    singleJourney: this.selectionState().singleJourney,
    returnDate: this.availableReturnDates()[0],
    returnVariation: 1,
  };
  stepLevel = signal(1);

  constructor(){
    if(!this.stations().length){
      this.store.dispatch(DestinationsActions.loadDestinations())
    }
    effect(()=>{
      if(this.selectionState().origin){
        this.flightsService.getTakeOffDatesFromOne(this.selectionState().origin).subscribe((dateArray=>this.availableDepartureDates.set(dateArray)))
      }
      if(this.selectionState().destinations.length){
        this.flightsService.getTakeOffDatesFromMany(this.selectionState().destinations).subscribe(dateArray=>this.availableReturnDates.set(dateArray))
      }
      })
    }
  
  departureDateFilter = (pickerDate: Date | null): boolean => {
    return pickerDate
      ? this.dateFilter(pickerDate, this.availableDepartureDates())
      : false;
  };
  returnDateFilter = (pickerDate: Date | null): boolean => {
    return pickerDate
      ? this.dateFilter(pickerDate, this.availableReturnDates())
      : false;
  };
  dateFilter(dateToTest: Date, availableDates: Date[]) {
    return availableDates.some((availableDate) => {
      availableDate.getDate() === dateToTest.getDate() &&
        availableDate.getMonth() === dateToTest.getMonth() &&
        availableDate.getFullYear() === dateToTest.getFullYear();
    });
  }
  toStep(step: number) {
    this.stepLevel.set(step);
  }
  dateRangeCalculator(date: Date, variation: number) {
    const start = new Date(date);
    start.setDate(date.getDate() - variation - 1);
    const end = new Date(date);
    end.setDate(date.getDate() + variation + 1);
    return new DateRange(start, end);
  }
  searchFlights() {
    console.log(this.selectionForm.origin)
  }
  onReset() {
    this.store.dispatch(SelectionActions.clearSelection());
    this.selectionForm = {
      class: this.selectionState().class,
      passengers: 1,
      origin: this.selectionState().origin,
      destinations: this.selectionState().destinations,
      departureDate: this.availableDepartureDates()[0],
      departureVariation: 1,
      singleJourney: this.selectionState().singleJourney,
      returnDate: this.availableReturnDates()[0],
      returnVariation: 1,
    };
  }
}
