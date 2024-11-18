import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { errorHandl } from 'src/app/utils/network-utils';
import { urls } from 'src/app/utils/url.utils';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(
    private http: HttpClient
  ) { }

  getTripDetail(id: any) {
    return this.http.get(urls.API_URL + urls.SINGLE_TRIP + `/${id}`)
      .pipe(catchError(errorHandl));
  }

  getDashboardTrips(payload: any) {
    return this.http.post(urls.API_URL + urls.ASSIGN_TRIPS, payload);
  }
}
