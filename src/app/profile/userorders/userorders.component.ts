import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersService } from 'src/app/services/orders.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  shiporderid:any
  shiprocketData:any
  awbCode:any
  orderid:any
  orderstatus:any

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
        console.log(orders)
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
  getstatus(order){
    this.shiporderid = order.shiporderid
    this.order.getorderstatus(this.shiporderid).subscribe((data)=>{
      console.log(data.data)
      this.shiprocketData = data.data
      this.awbCode =this.shiprocketData.awb_data.awb
      this.orderstatus = this.shiprocketData.status
      this.orderid = order.orderid
      if(this.awbCode != null && this.awbCode != undefined && this.awbCode != "" ){
        this.order.setorderstatus(this.orderid,this.orderstatus).subscribe((status)=>{
          window.open('https://shiprocket.co/tracking/'+ this.awbCode)
          console.log(status)
        })
      }else{
        Swal.fire(
          'Not Yet Shipped!',
          'Please Try After Some Time',
          'info'
        )
      }

    })
    console.log(order)
  }
  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
  }
}
