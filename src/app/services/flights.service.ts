import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Destination } from '../models/destination';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  httpOptions: any = { withCredentials: true };
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/destinations`).pipe(
      map((res) => {
        console.table(res);
        return res;
      })
    );
  }
}
