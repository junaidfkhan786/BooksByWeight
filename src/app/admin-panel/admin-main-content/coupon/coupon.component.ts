import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminCouponService } from 'src/app/services/admin-coupon.service'
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  constructor(
    private couponpost: AdminCouponService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
  }
  coupons = {
    coupon_code: null,
    percentage: false,
    coupon_amount: null,
    expiry_date: null
  }
  couponsnull() {
    this.coupons.coupon_code = null
    this.coupons.coupon_amount = null
    this.coupons.expiry_date = null
    this.coupons.percentage = null
  }
  submit() {
    console.log(this.coupons)
if(this.coupons.coupon_code != null &&
   this.coupons.coupon_amount != null &&
   this.coupons.percentage != null &&
   this.coupons.expiry_date != null
     ){
  this.couponpost.postcoupon(this.coupons).subscribe((resp) => {
    console.log(resp)
    if(resp){
      this.toastr.success('Coupon Was Created', 'BooksByWeight', {
        timeOut: 1000,
      });
      this.couponsnull();
    }else{
      this.toastr.error('Cant Create Coupon', 'BooksByWeight', {
        timeOut: 1000,
      });
    }

    
  }, (error) => {
    console.log(error)
  })
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please Fill All Details Correctly',
  })

}

  }
}
