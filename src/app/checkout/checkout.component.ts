import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
import { Orders } from '../models/orders.model';
import { OrdersService } from '../services/orders.service';
declare var $: any;
@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
  })
  export class CheckoutComponent implements OnInit {
    shipping:any = 100;
    book$: any = [];
    cartitem: any = [];
    cartitem1: any = []; 
    subtotal: any;
    totalweight: any;
    cartitem2: any = [];
    cartitem4: any = [];
    c: any = [];
    totalitems:any;
    quantity: any;
    cartitem5: any;
    qty: any = [];
    qty1: any = [];
    counterValue: number;
    totalw: any;
    pid1: any = [];
    order1 : Orders = new Orders();
    order2:any = [];
amountpayable:any
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private order: OrdersService,
  ) {}
  ngOnInit(): void {

    this.jquery_code();
  
  }
  jquery_code() {
    $(document).ready(function () { });
  }
 
}