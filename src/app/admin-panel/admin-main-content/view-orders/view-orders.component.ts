import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
import { error } from '@angular/compiler/src/util';
import { Subject } from 'rxjs';
import { AdminLoginService } from 'src/app/services/admin-login.service';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  orderslength: any
  orders$: any
  pages: number = 1
  i: number
  opened: boolean
  constructor(
    private toggle: AdminLoginService,
    private allorders: AdminOrdersService
  ) {
    this.toggle.opensidebar.subscribe((toggle) => {
      this.opened = toggle
    })
  }

  ngOnInit() {
    this.GetAllOrders();
  }

  GetAllOrders() {
    this.allorders.getallorders(1).subscribe(
      (orders) => {
        this.orders$ = orders.orderWithAddress
        this.orderslength = orders.length
        console.log(orders)

      },
      (error) => {
        if (error) {
          console.error(error)
        }
      },
      () => console.log("All Orders Fetched SuccessFully")
    )
  }
  viewdetails(data) {
    let orderid = data.orderid

    window.open(
     ' admin/dashboard/view-orders/AdminOrderDetails/'+orderid,
      '_blank'
    );
    
    console.log(data)
  }
  cancelorder(id) {
    console.log(id)
  }

  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
  }
}
