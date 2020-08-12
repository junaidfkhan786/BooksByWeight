import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_LIVE, httpOptions, API_URL } from '../models/api.model';
import {Orders } from '../models/orders.model'

import { Observable  } from 'rxjs';


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
    
   return  this._http.post<Orders>(`${API_LIVE}` + '/order/create',order,httpOptionsauth)
  


  }


}
