import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { urls } from '../../utils/url.utils';
import { errorHandl } from '../../utils/network-utils';
import * as moment from 'moment-timezone';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceOld {
  public KEY_TOKEN:string = 'token';
  private user: any;

  constructor(private http: HttpClient) {
  }


  staffComponentRoles = {
    company: 'Full Access',
    accountant: 'Accountant',
    credential: 'Credentialer',
    mdispatcher: 'Dispatch Manager',
    dispatcher: 'Dispatcher',
    mcallcenter: 'Call Center Manager',
    rcallcenter: 'Call Center Representative'
  }

  accountStatus = {
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



  login(email: any, password: any, roles: any): Observable<any> {
    const user = {
      email,
      password,
      roles
    };
    return this.http.post<any>(urls.API_URL + urls.SIGNIN_URL, user)
      .pipe(
        catchError(errorHandl)
      );
  }

  VerifyToken(): Observable<any> {
    return this.http.get<any>(urls.API_URL + urls.PROFILE_URL)
      .pipe(
        catchError(errorHandl)
      );
  }

  forgetPasswordRequestwithNgx(email: string): Observable<any> {
    const user = {
      email,
      roles: 'company'
    };
    // console.log('forget Password Request ', user);
    return this.http.post<any>(urls.API_URL + urls.FORGOT_URL, user)
      .pipe(
        catchError(errorHandl)
      );
  }

  // saving token
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

  getToken(key: string) {
    try {
      const token = localStorage.getItem(key);
      return token ? JSON.parse(token) : '';
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }


  getUserData() {
    return this.user;
  }

  CheckLoginValidation(user: any, isAuthLoggedIn: boolean) {
    if (user == null) {
      this.user = null;
    } else {
      this.user = user;
      moment.tz.setDefault(user.timeZone);

    }
  }
  }







