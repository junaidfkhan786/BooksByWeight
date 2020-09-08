import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoupontransferService {

couponid:any = new BehaviorSubject(null)
coupon_code:any = new BehaviorSubject(null)
coupon_amount:any = new BehaviorSubject(null)
percentage:any = new BehaviorSubject(null)
expiry_date:any = new BehaviorSubject(null)

constructor() { }
}
