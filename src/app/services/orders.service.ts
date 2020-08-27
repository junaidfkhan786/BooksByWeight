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
  public postorder(_id,order : Orders):Observable<any>{
    const httpOptionsauth = {
     
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
      })
    }
    
   return  this._http.post<Orders>(`${API_LIVE}` + '/order/create?address='+_id,order,httpOptionsauth)
  


  }
  public verifypayment(orderid,paymentid,paymentsignature,userid):Observable<any>{
    // const httpOptionsauth = {
     
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
    //   })
    // }
    
   return this._http.post(`${API_LIVE}` + "/order/verify?razorpay_order_id=" + orderid + "&razorpay_payment_id="+ paymentid + "&razorpay_signature="+paymentsignature + "&userId=" + userid,httpOptions)
  


  }


}
