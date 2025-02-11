import {
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectionFeature } from '../../../store/reducers/selection.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
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
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { destinationsFeature } from '../../../store/reducers/destinations.reducer';
import { DestinationsActions } from '../../../store/actions/destinations.actions';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FlightsSelector } from '../../../models/flights-selector';
import { Destination } from '../../../models/destination';

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
    MatChipsModule,
    MatAutocompleteModule,
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
  styleUrls: ['./selector-pannel.component.scss'],
})
export class SelectorPannelComponent {
  store = inject(Store);
  flightsService = inject(FlightsService);

  // Signals
  stations = this.store.selectSignal(destinationsFeature.selectDestinations);
  availableDepartureDates = signal<Date[]>([]);
  availableReturnDates = signal<Date[]>([]);
  storedSelection = this.store.selectSignal(
    selectionFeature.selectSelectionDetails
  );
  readyToSend = this.store.selectSignal(selectionFeature.selectIsRequestable);

  // Selection form
  selectionForm: FlightsSelector = {
    class: '',
    passengers: 1,
    origin: this.storedSelection().origin,
    destinations: this.storedSelection().destinations,
    departureDate: null,
    departureVariation: 1,
    singleJourney: true,
    returnDate: null,
    returnVariation: 1,
  };
  validatedDates = () => {
    const msInDay = 86400000; // Nombre de millisecondes dans une journée
    // Vérification que departureDate et returnDate sont bien des objets Date valides
    const isValidDate = (date: any) =>
      date instanceof Date && !isNaN(date.getTime());

    if (!this.selectionForm.singleJourney) {
      // Si singleJourney est faux, vérifier si departureDate et returnDate sont des dates valides
      return this.selectionForm.departureDate &&
        isValidDate(this.selectionForm.departureDate) &&
        this.selectionForm.returnDate &&
        isValidDate(this.selectionForm.returnDate)
        ? // Comparer la date de départ + variation (en jours) avec la date de retour - variation (en jours)
          this.selectionForm.departureDate.getTime() +
            this.selectionForm.departureVariation * msInDay <
            this.selectionForm.returnDate.getTime() -
              this.selectionForm.returnVariation * msInDay
        : false; // Si l'une des dates n'est pas valide, renvoyer false
    } else {
      // Si ce n'est pas un voyage aller-retour, juste vérifier si departureDate est une date valide
      return this.selectionForm.departureDate &&
        isValidDate(this.selectionForm.departureDate)
        ? true
        : false;
    }
  };

  stepLevel = signal(1);

  constructor() {
    if (!this.stations().length) {
      this.store.dispatch(DestinationsActions.loadDestinations());
    }
    effect(() => {
      if (this.selectionForm.origin) {
        this.flightsService
          .getTakeOffDatesFromOne(this.selectionForm.origin)
          .subscribe((dates) => this.availableDepartureDates.set(dates));
      }
      if (this.selectionForm.destinations.length) {
        this.flightsService
          .getTakeOffDatesFromMany(this.selectionForm.destinations)
          .subscribe((dates) => this.availableReturnDates.set(dates));
      }
      this.destinations.set(this.destinationsCleaner(this.stations())); // met à jour le tableau de destination en cas de rechargement de la page
    },
    {allowSignalWrites:true});
  }

  // Stations selections
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]; // permet de séparer les destinations par la touche entrée ou une virgule dans l'input
  destinationsCleaner(stations: Destination[]): string[] {
    return stations
      .filter((station) => station.name !== this.selectionForm.origin)
      .map((dest) => dest.name);
  }
  destinations = signal(this.destinationsCleaner(this.stations()));
  // déclanché aux changement d'origin
  cleanDestinations(event: MatSelectChange) {
    const newOrigin = event.value;
    this.removeDest(newOrigin); // supprime la nouvelle origine de la selection des destinations
    this.destinations.set(this.destinationsCleaner(this.stations())); // met à jour le tableau de destination sans la nouvelle origine
    this.store.dispatch(SelectionActions.changeOriginSelection(newOrigin));
  }
  // déclenché à la selection d'un element de la liste fournis par mat-autocomplete
  selectDest(event: MatAutocompleteSelectedEvent): void {
    const targetedDestination = event.option.viewValue;
    if (
      !this.selectionForm.destinations.includes(targetedDestination) &&
      this.destinations().includes(targetedDestination)
    ) {
      this.selectionForm.destinations = [
        ...this.selectionForm.destinations,
        targetedDestination,
      ];
    }
    event.option.deselect();
  }
  // déclanché à la saisie de #destInput
  addDest(event: MatChipInputEvent) {
    const newDest = (event.value || '').trim();
    if (
      newDest &&
      !this.selectionForm.destinations.includes(newDest) &&
      this.destinations().includes(newDest)
    ) {
      this.selectionForm.destinations.push(newDest);
      this.store.dispatch(
        SelectionActions.changeDestinationsSelection({
          newDestinations: this.selectionForm.destinations,
        })
      );
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeDest(_dest: string) {
    this.selectionForm.destinations = this.selectionForm.destinations.filter(
      (dest) => dest !== _dest
    );
  }

  departureDateFilter = (pickerDate: Date | null): boolean =>
    pickerDate
      ? this.dateFilter(pickerDate, this.availableDepartureDates())
      : false;

  returnDateFilter = (pickerDate: Date | null): boolean =>
    pickerDate
      ? this.dateFilter(pickerDate, this.availableReturnDates())
      : false;

  dateFilter(dateToTest: Date, availableDates: Date[]): boolean {
    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === dateToTest.getDate() &&
        availableDate.getMonth() === dateToTest.getMonth() &&
        availableDate.getFullYear() === dateToTest.getFullYear()
    );
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
    console.log(this.selectionForm);
  }

  onReset() {
    this.store.dispatch(SelectionActions.clearSelection());
    this.selectionForm = {
      class: this.store.selectSignal(selectionFeature.selectSelectionDetails)()
        .class,
      passengers: 1,
      origin: this.store.selectSignal(selectionFeature.selectSelectionDetails)()
        .origin,
      destinations: [],
      departureDate: null,
      departureVariation: 1,
      singleJourney: false,
      returnDate: null,
      returnVariation: 1,
    };
  }
}
