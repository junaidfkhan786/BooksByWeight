import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_LIVE, httpOptions, API_URL } from '../models/api.model';
import {Orders } from '../models/orders.model'
import {ShipRocketOrders } from '../models/shiprocketorder.model'
import { Observable  } from 'rxjs';
import { useradd } from '../models/useraddress.model';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

shiprocketUrl:any = "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc";

  constructor(private _http: HttpClient) { }
  public postorder(amount,id):Observable<any>{

    const httpOptionsauth = {

      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1, -1)

      })
    }
    if (localStorage.getItem('User') != null) {
   return this._http.post<any>(`${API_LIVE}` + '/order/create?amount='+amount +"&userId="+ id, httpOptionsauth)
    }


  }

  public verifypayment(orderid,paymentid,paymentsignature, ordermodel : Orders):Observable<any>{
    const httpOptionsauth = {
     
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
      })
    }
    
   return this._http.post(`${API_LIVE}` + "/order/verify?razorpay_order_id=" + orderid + "&razorpay_payment_id="+ paymentid + "&razorpay_signature="+paymentsignature,ordermodel,httpOptionsauth)
  


  }
  public shiprocketorder(shiprocket: ShipRocketOrders):Observable<any>{
    const httpOptionsauth = {
     
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('shiprocket')
  
      })
    }
   return this._http.post<any>("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",shiprocket,httpOptionsauth)
  


  }
  public GetOrderById(orderid):Observable<any>{
    // const httpOptionsauth = {
     
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1);
  
    //   })
    // }
    
   return this._http.get<any>(`${API_LIVE}` + '/order/getorderbyid/'+orderid,httpOptions)
  


  }


}
