import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { errorHandl } from 'src/app/utils/network-utils';
import { urls } from 'src/app/utils/url.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  staffComponentRoles: any = {
    company: 'Full Access',
    accountant: 'Accountant',
    credential: 'Credentialer',
    mdispatcher: 'Dispatch Manager',
    dispatcher: 'Dispatcher',
    mcallcenter: 'Call Center Manager',
    rcallcenter: 'Call Center Representative'
  }

  accountStatus: any = {
    active: 'Active',
    inactive: 'InActive',
  }

  fleetAccountStatus = {
    active: 'Active',
    inactive: 'InActive',
  }

  driverComponentProfileRoles = {
    driver: 'Driver',
    dispatcher: 'Dispatcher'
  }

  constructor(
    private http: HttpClient
  ) { }

  signin(payload: any): Observable<any> {
    return this.http.post<any>(urls.API_URL + urls.SIGNIN_URL, payload)
      .pipe(
        catchError(errorHandl)
      );
  }

  me(): Observable<any> {
    return this.http.get<any>(urls.API_URL + urls.PROFILE_URL)
      .pipe(
        catchError(errorHandl)
      );
  }

  getToken() {
    try {
      const token = localStorage.getItem('token');
      return token ? JSON.parse(token) : '';
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  setToken(data: any): void {
    try {
      localStorage.setItem('token', JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  removeToken(): void {
    try {
      localStorage.removeItem('token');
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }
}
