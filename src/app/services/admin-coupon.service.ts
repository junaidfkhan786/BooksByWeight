import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions, API_LIVE } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCouponService {

  constructor(
    private http: HttpClient
  ) { }

  public postcoupon(coupons) {

    return this.http.post(`${API_LIVE}`+'/coupon/AddCoupon/',coupons, httpOptions)

  }

}
