import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
import { error } from '@angular/compiler/src/util';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  orderslength:any
  orders$:any
  pages: number = 1
  i:number
  constructor(
    private allorders: AdminOrdersService
  ) {  }

  ngOnInit() {
    this.GetAllOrders();
  }

  GetAllOrders() {
    this.allorders.getallorders().subscribe(
      (orders) => {
        this.orders$ = orders
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
  viewdetails(data){
console.log(data)
  }
  cancelorder(id){
console.log(id)
  }

  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
  }
}
