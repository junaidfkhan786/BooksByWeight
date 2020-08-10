import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_LIVE, httpOptions, API_URL } from '../models/api.model';
import {Orders } from '../models/orders.model'

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _http: HttpClient) { }
  public postorder(order : Orders):Observable<any>{
    const httpOptionsauth = {
     
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
      })
    }
    const body=JSON.stringify(order);
   return  this._http.post<any[]>(`${API_URL}` + '/order/create',body,httpOptionsauth).pipe(
    map((data: any) => {
      return data;
    }), catchError( error => {
      return throwError(error.error);
    })
 )

  }


}
