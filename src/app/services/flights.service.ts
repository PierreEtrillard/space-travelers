import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Destination } from '../models/destination';
import { concatMap, forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectionFeature } from '../store/reducers/selection.reducer';
import { FlightsGroup } from '../models/flights-group';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private httpOptions: any = { withCredentials: true };
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private store = inject(Store);
  private selection = this.store.selectSignal(
    selectionFeature.selectSelectionDetails
  );
  destinations$ = this.http.get<Destination[]>(`${this.apiUrl}/destinations`);
  destinations = toSignal(
    this.http.get<Destination[]>(`${this.apiUrl}/destinations`).pipe(
      map((res) => {
        return res;
      })
    ),
    { initialValue: [] }
  );

  getflights$ = this.http.post<FlightsGroup[]>(
    `${this.apiUrl}/flights/search`,
    this.selection()
  );
  countFlightsRegistred$ = this.http.get<number>(
    `${this.apiUrl}/flights/count`
  );
  getTakeOffDatesFromOne(station: string): Observable<Date[]> {
    interface TakeOffDatesDto {
      departure: Date;
    }
    return this.http
      .post<TakeOffDatesDto[]>(`${this.apiUrl}/flights/from`, station)
      .pipe(
        map((takeOffList) =>
          takeOffList.map((takeOffDate) => new Date(takeOffDate.departure))
        )
      );
  }
  getTakeOffDatesFromMany(stations: string[]): Observable<Date[]> {
    return from(stations)
    .pipe(
      concatMap((station:string) => {
        console.log("station: "+station);
        
        return this.getTakeOffDatesFromOne(station)}
    ))
  }
}
