import { Injectable } from '@angular/core';
import { API_LIVE } from '../models/api.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { OrdersService } from './orders.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {

  constructor(
    private http : HttpClient,
    private order : OrdersService
  ) {
    this.order.getorderload().subscribe(()=>[
      this.totalorders
    ])
   }
  
  
  totalorders = new BehaviorSubject<any>(null);

  public getallorders():Observable<any> {

  return this.http.get<any>(`${API_LIVE}`+"/order/getallorders");
      


  }


 
}
