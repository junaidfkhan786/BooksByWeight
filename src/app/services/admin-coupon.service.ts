import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions, API_LIVE } from '../models/api.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

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

  public getcoupon(){
    return this.http.get(`${API_LIVE}`+'/coupon/getAll', httpOptions)
  }

}
