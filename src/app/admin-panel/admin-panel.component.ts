import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminOrdersService } from '../services/admin-orders.service';
import { OrdersService } from '../services/orders.service';
import { AdminCouponService } from '../services/admin-coupon.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  orderslength: any
  orders$: any
  constructor(
    public spinner: NgxSpinnerService,
    private allorders: AdminOrdersService,
    private orders: OrdersService,
    private couponservice: AdminCouponService
  ) { }

  ngOnInit() {
    this.orders.getorderload().subscribe(() => {
      this.GetAllOrders();
    })
    this.GetAllOrders();
    this.getallcoupons();
  }

  opened: any

  receave($event) {
    this.opened = $event;

  }

  GetAllOrders() {
    this.allorders.getallorders().subscribe(
      (orders) => {
        this.allorders.totalorders.next(orders.length)
      },
      (error) => {
        if (error) {
          console.error(error)
        }
      },
      () => console.log("All Orders Fetched SuccessFully In Admin Panel For Order Count Only")
    )
  }

  getallcoupons() {
    this.couponservice.getcoupon().subscribe((coupons) => {
      let couponlength: any = []
      couponlength = coupons
      this.couponservice.totalcoupons.next(couponlength.length)
    })
  }

}
