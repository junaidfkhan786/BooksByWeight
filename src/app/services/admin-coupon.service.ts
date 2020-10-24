import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions, API_LIVE } from '../models/api.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCouponService {

  private couponload = new Subject<any>();
  getcouponload() {
    return this.couponload;
  }
  constructor(
    private http: HttpClient
  ) { }

totalcoupons = new BehaviorSubject<any>("loading...")

  public postcoupon(coupons) {

    return this.http.post(`${API_LIVE}`+'/coupon/AddCoupon/',coupons, httpOptions).pipe(
      tap(() => {
        this.couponload.next();
      })
    );

  }

  public getcoupon():Observable<any>{
    return this.http.get<any>(`${API_LIVE}`+'/coupon/getAll', httpOptions)
  }

public delcoupon(id):Observable<any>{
    return this.http.delete<any>(`${API_LIVE}`+'/coupon/' + id , httpOptions)
  }
}
