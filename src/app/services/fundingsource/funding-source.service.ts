import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { urls } from '../../utils/url.utils';
import { HttpClient } from '@angular/common/http';
import { errorHandl } from 'src/app/utils/network-utils';


@Injectable({
  providedIn: 'root'
})
export class FundingSourceService {

  constructor(private http: HttpClient) { }

  getFundingSourceUsers(status: any): Observable<any> {
    return this.http.get<any>(urls.API_URL + urls.FUNDING_SOURCE_LIST + '?accountStatus=' + status)
      .pipe(
        catchError(errorHandl)
      );
  }


  getFundingSourceUserById(id: any): Observable<any> {
    return this.http.get<any>(urls.API_URL + urls.FUNDING_SOURCE_LIST + '/' + id)
      .pipe(
        catchError(errorHandl)
      );
  }

  addFundingSourceUser(data:any): Observable<any> {
    // Check for empty
    if (!(data.payorTypes && data.payorTypes.length)) {
        delete data.payorTypes;
    }
    const imageFiles = data.images;
    const fundingSourceId = data.corporateUserId;
    delete data.images;
    delete data.corporateUserId;
    if (!(data.payorTypes && data.payorTypes.length) && !fundingSourceId) {
        delete data.payorTypes;
    }
    let formData;
    // if (!imageFiles.newProfilePicture) {
    //     formData = setFormDataV2({ ...data }, 'cooperate');
    // } else {
    //     formData = setFormDataV2({ ...data, ...imageFiles }, 'cooperate');
    // }
    // const formData = setFormData(imageFiles, data, 'cooperate');
    if (fundingSourceId) {
        return this.http.put<any>(urls.API_URL + urls.FUNDING_SOURCE_LIST + '/' + fundingSourceId, formData).pipe(
            catchError(errorHandl)
        );
    } else {
        return this.http.post<any>(urls.API_URL + urls.FUNDING_SOURCE_LIST, formData).pipe(
            catchError(errorHandl)
        );
    }
}
}
