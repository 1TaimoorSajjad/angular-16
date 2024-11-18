import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { errorHandl, setFormData, setFormDataV2 } from 'src/app/utils/network-utils';
import { urls } from 'src/app/utils/url.utils';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  getCompanies(queryParams: any): Observable<any> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get<any>(urls.API_URL + urls.GET_COMPANIES, { params })
      .pipe(catchError(errorHandl));
  }

  getCompanyById(id: any) {
    return this.http.get<any>(urls.API_URL + urls.GET_COMPANIES + `/${id}`)
      .pipe(catchError(errorHandl));
  }

  saveCompany(companyId: any, payload: any) {
  }
}
