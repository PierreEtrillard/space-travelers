import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Destination } from '../models/destination';
import { map, Observable } from 'rxjs';
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
  private http=inject( HttpClient);
  private store = inject(Store); 
  private selection = this.store.selectSignal(selectionFeature.selectSelectionDetails)
  destinations$ = this.http.get<Destination[]>(`${this.apiUrl}/destinations`);
  destinations= toSignal(
    this.http.get<Destination[]>(`${this.apiUrl}/destinations`).pipe(
      map((res) => {
        return res;
      })
    )
  ,{initialValue:[]});
  
  getflights$= this.http.post<FlightsGroup[]>(`${this.apiUrl}/flights/search`,this.selection());

}
