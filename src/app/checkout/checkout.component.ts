import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
import { Orders } from '../models/orders.model';
import { OrdersService } from '../services/orders.service';
import { UserAddressService } from '../services/user-address.service';
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
    price: any;
    subtotal: any;
    totalweight: any;
    total: any[];
    cartitem2: any = [];
    weight: any;
    weight2: any = [];
    cartitem4: any = [];
    c: any = [];
    quantity: any;
    cartitem5: any;
    qty: any = [];
    qty1: any = [];
    counterValue: number;
    order1: Orders = new Orders();
    order2: any = [];
    totalw: any;
    pid1: any = [];
    message: any;
    address_id: any;
    address : any = [];
    addlength:any;
amountpayable:any;
selected: boolean;
placebutton : boolean;
  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router,
    private order: OrdersService,
    private gettingadd: UserAddressService,
  ) {}
  ngOnInit(): void {
this.placebutton = false
    this.selected = true
    if(localStorage.getItem('User') !=null){
      this.gettingadd.getrefresuser().subscribe(() => {
        this.getadd();

      })
      this.getadd();
      if(this.cartitem2.lenght == 0){
        window.location.assign('/books')
      }
    }if (localStorage.getItem('User') == null) {
     window.location.assign('/login')
    }
    if(localStorage.getItem('User') !=null){
this.loadcart();
    }
    this.jquery_code();
  
  }
  jquery_code() {
    $(document).ready(function () { });
  }
  loadcart() {
    this.cart.getCart().subscribe((data) => {
      this.book$ = data;
      this.subtotal = this.book$.subtotal;
      this.totalweight = this.book$.totalweight;

      this.amountpayable = this.subtotal + this.shipping;
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

  getadd() {
    this.gettingadd.getaddress().subscribe((resp) => {
      this.address = resp.address
      this.selected = this.address[0]._id
      console.log(this.address)
      this.addlength = this.address.length;


    }, (error) => {
  console.log(error)
    })
  }

  getaddid(add){
    this.address_id = add._id

    this.placebutton = true
    this.selected = !this.selected;
    this.toastr.success('this is Address selected'+ ' ' + add.fullName + ' ' + add.address + ' ' + add.pinCode, 'BooksByWeight', {
      timeOut: 3000,
    
    });
    console.log(this.address_id)
  }
  createorder(id) {
   this.address_id = id
    this.order1.book = this.pid1;
    this.order1.amount = this.amountpayable;
    this.order1.totalitems = this.cartitem2.length;
    this.order1.totalweight = this.totalweight;
console.log(this.address_id, this.order1)

    let res = this.order.postorder(this.address_id,this.order1);
    res.subscribe((response) => {
      this.order2 = response
      console.log(this.order2)
      this.toastr.success('Order Successfully Created', 'BooksByWeight', {
        timeOut: 1000,
      
      });
    })
    this.placebutton = false
    this.selected = false;
  }
 showadd(){
   this.selected = true
 }
}