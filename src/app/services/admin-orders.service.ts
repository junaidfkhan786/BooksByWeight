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
  ) {   }


  totalorders = new BehaviorSubject<any>("loading...");

  public getallorders(page):Observable<any> {

  return this.http.get<any>(`${API_LIVE}`+"/order/getallorders?page="+page);



  }



}
