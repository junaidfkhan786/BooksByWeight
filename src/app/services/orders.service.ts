import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_LIVE, httpOptions, API_URL } from '../models/api.model';
import {Orders } from '../models/orders.model'
import {ShipRocketOrders } from '../models/shiprocketorder.model'
import { Observable, Subject  } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orderload = new Subject<any>();
  getorderload() {
    return this.orderload;
  }
shiprocketUrl:any = "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc";

  constructor(private _http: HttpClient) { }
  public postorder(amount,id):Observable<any>{

    if (localStorage.getItem('User') != null) {
   return this._http.post<any>(`${API_LIVE}` + '/order/create?amount='+amount +"&userId="+ id, httpOptions)
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
   .pipe(
    tap(() => {
      this.orderload.next();
    })
  );
  


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
  public shiprocketresponse(userid,orderid,shippingid,shiporderid):Observable<any>{
   return this._http.post(
     `${API_LIVE}` + '/order/updateorder/'+ orderid +'?shippingid='+ shippingid + '&shiporderid='+ shiporderid + '&userId='+ userid,httpOptions
     ).pipe(
      tap(() => {
        this.orderload.next();
      })
    );
    
  


  }
 
  public getorderbyuser():Observable<any>{

    const httpOptionsauth = {

      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1, -1)

      })
    }
    return this._http.get<any>(`${API_LIVE}`+ '/order/getorders',httpOptionsauth)
  }

}
