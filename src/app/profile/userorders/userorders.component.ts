import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.css']
})
export class UserordersComponent implements OnInit {
  orderslength: any
  orders$: any
  pages: number = 1
  i:number
  constructor(
    private order: OrdersService,
    private route: ActivatedRoute,
    private router:Router,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit() {
    this.GetAllOrders();
  }
  GetAllOrders() {
    this.order.getorderbyuser().subscribe(
      (orders) => {
        this.orders$ = orders
        this.orderslength = orders.length

      },
      (error) => {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  viewdetails(data) {
    var _id = data.orderid
    

window.open(
  'orderdetails/'+ _id,
  '_blank'
);

  }
  cancelorder(id) {
    console.log(id)
  }
  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
  }
}
