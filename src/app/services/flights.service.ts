import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Destination } from '../models/destination';
import { map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private httpOptions: any = { withCredentials: true };
  private apiUrl = environment.apiUrl;
  private http=inject( HttpClient) 
  destiantions= toSignal(
    this.http.get<Destination[]>(`${this.apiUrl}/destinations`).pipe(
      map((res) => {
        console.table(res);
        return res;
      })
    )
  ,{initialValue:[]});
}
