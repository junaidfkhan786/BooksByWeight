import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminCouponService } from 'src/app/services/admin-coupon.service'
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  button: boolean = false
  pages: number = 1;
  allcoupons:any = []
i:number
  constructor(
    private couponservice: AdminCouponService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.couponservice.getcouponload().subscribe(()=>{
      this.getallcoupons();
    })
    this.getallcoupons();
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
    this.coupons.percentage = false
  }
  submit() {
    console.log(this.coupons)
    if (this.coupons.coupon_code != null &&
      this.coupons.coupon_amount != null &&
      this.coupons.percentage != null &&
      this.coupons.expiry_date != null
    ) {
      this.couponservice.postcoupon(this.coupons).subscribe((resp) => {
        console.log(resp)
        if (resp) {
          this.toastr.success('Coupon Was Created', 'BooksByWeight', {
            timeOut: 1000,
          });
          this.couponsnull();
        } else {
          this.toastr.error('Cant Create Coupon', 'BooksByWeight', {
            timeOut: 1000,
          });
        }


      }, (error) => {
        console.log(error)
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill All Details Correctly',
      })

    }
  }
addcoupon(){
  this.button = !this.button
}
onPageChange(page: number = 1) {
  this.pages = page;
  window.scrollTo(0, 60);
}


getallcoupons(){
  this.couponservice.getcoupon().subscribe((data) => {
    console.log(data)
        this.allcoupons = data
  })
}
delcoupon(id){
  this.couponservice.delcoupon(id).subscribe((data) => {
    console.log(data)
    if (data) {
      this.toastr.error('Coupon Was Deleted', 'BooksByWeight', {
        timeOut: 1000,
      });
      window.location.reload()
    } else {
      this.toastr.error('Cant Delete Coupon', 'BooksByWeight', {
        timeOut: 1000,
      });
    }
  })
}


}
