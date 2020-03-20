import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  //base url
  baseRoot: any = environment.baseUrl;
  apiUrl: any = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  //get all interviewer pannel
  searchStore(key:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    return this.http.get<any>(this.baseRoot + '/index.php?route=product/seller/autocomplete&filter_name=' + key, { headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

  //check for store name avialbility
  checkStoreNameAvailability(storeName: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    return this.http.post<any>(this.baseRoot + 'seller/index.php?route=saccount/register/availability', 'username=' + storeName , { headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

}
