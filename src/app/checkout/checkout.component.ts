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
    private cart: CartService,
    private router: Router,
    private order: OrdersService,
  ) {}
  ngOnInit(): void {
    this.loadcart();
    this.jquery_code();
  
  }
  jquery_code() {
    $(document).ready(function () { });
  }
  loadcart() {
    this.cart.getCart().subscribe((data) => {
      this.book$ = data;
      this.subtotal = this.book$.subtotal;
      this.amountpayable = this.subtotal + this.shipping; 
      this.totalweight = this.book$.totalweight;
      if (this.book$.cartItems.length > 0) {
        const cartitem = this.book$.cartItems[0].cart;
        for (var { quantity: qty } of cartitem) {
          this.qty = qty;
          this.qty1.push(this.qty);
        }
        for (var { book: books } of cartitem) {
          this.cartitem1 = books;
          this.cartitem2.push(this.cartitem1);
        }
        let cartitem3 = this.cartitem2;
        for (var { _id: id } of this.cartitem2) {
          this.pid1.push(id);
        }
        for (var i = 0; i <= cartitem3.length; i++) {
          if (cartitem3[i] == undefined) {
            return false;
          }
          this.c = cartitem3[i].weight;
          this.cartitem4.push(this.c);
          let sum = 0;
          for (let r of this.cartitem4) {
            sum = sum + r;
          }
          this.cartitem5 = sum;
        }
      }
       
    });
  }
  createorder(book = this.pid1, amount = this.subtotal, totalitems = this.cartitem2.length, totalweight = this.totalweight) {
    console.log(this.pid1)
  this.order1.book = book;
    this.order1.amount = amount;
    this.order1.totalitems = totalitems;
    this.order1.totalweight = totalweight;
    console.log(this.order1)
    let res = this.order.postorder(this.order1);
    res.subscribe((response) => {
      this.order2 = response
      console.log(this.order2)
    })
  }

}