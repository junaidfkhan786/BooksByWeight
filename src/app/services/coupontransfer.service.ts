import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoupontransferService {

couponid:any = new BehaviorSubject(0)
coupon_code:any = new BehaviorSubject(0)
coupon_amount:any = new BehaviorSubject(0)
percentage:any = new BehaviorSubject(0)
expiry_date:any = new BehaviorSubject(0)

constructor() { }
}
