import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
import { Orders } from '../models/orders.model';
import { OrdersService } from '../services/orders.service';
import { UserAddressService } from '../services/user-address.service';
import { WindowRefService } from '../services/window-ref.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Verifypayment } from '../models/verifypayment.model'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_LIVE } from '../models/api.model';
import * as jwt_decode from 'jwt-decode';
import { identifierModuleUrl } from '@angular/compiler';
declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [WindowRefService]
})
export class CheckoutComponent implements OnInit,OnDestroy {
  shipping: any = 100;
  book$: any = [];
  cartitemlength: any;
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
  address: any = [];
  addlength: any;
  orderid: any;
  paymentid: any;
  sig: any;
  amountpayable: any;
  selected: boolean;
  placebutton: boolean;
  rzp1: any;
  verifypay: Verifypayment = new Verifypayment();
  UserData: any;
  userid: any;

  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router,
    private order: OrdersService,
    private gettingadd: UserAddressService,
    public windowref: WindowRefService,
    private _http: HttpClient
  ) { }
  ngOnInit(): void {

    setInterval(() => {
      if ($('#orderid').val() != '') {
        this.ordersaved();
      }

    }, 1000)
    if (sessionStorage.getItem('orderid') != null) {
      this.ordersaved()
    }
    this.placebutton = false
    this.selected = true
    if (localStorage.getItem('User') != null) {
      this.gettingadd.getrefresuser().subscribe(() => {
        this.getadd();

      })
      this.getadd();

    }

    
    this.loadcart();

    this.jquery_code();
  }

  options = {
    "key": "rzp_test_ImeRpaCPi1JD7v",
    "key_secret": "TpJ7W7kEA7NuwqtPwno8NQhl",
    "image": "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
    "currency": "INR",
    "amount": '',
    "name": "BooksByweight",
    "description": "Books By Weight Test Transaction",
    "order_id": '',
    "handler": this.paymenthandler,
    "theme": {
      "color": "#227254"
    },

  };

  public initPay(): void {
    this.rzp1 = new this.windowref.nativeWindow.Razorpay(this.options);

    this.rzp1.open();

  }

  paymenthandler(response) {

    $("#orderid").val(response.razorpay_order_id);
    localStorage.setItem('orderid', response.razorpay_order_id )
    $("#paymentid").val(response.razorpay_payment_id);
    $("#signature").val(response.razorpay_signature);
if(response.razorpay_order_id){
  console.log(response)
}else{
  Swal.fire(
    'Payment Failer!',
    'error'
  )
}

  }

  ordersaved() {

    this.orderid = $('#orderid').val()
    this.paymentid = $('#paymentid').val()
    this.sig = $('#signature').val()
    var token = localStorage.getItem('User');
    var decode = jwt_decode(token);
    this.UserData = decode
    this.userid = this.UserData.userId
if(localStorage.getItem('orderid') != null){
  this.order.verifypayment(this.orderid, this.paymentid, this.sig, this.userid).subscribe((resp) => {
    localStorage.removeItem('orderid')
    
     if (resp.status == 'success') {


     console.log(resp.status)
 
       Swal.fire({
         title: 'Payment SuccessFull',
         icon: 'success',
         showCancelButton: false,
         confirmButtonColor: '#3085d6',
         confirmButtonText: 'Done'
       }).then((result) => {
         if (result.value) {
 window.location.assign('/books')
         }
       })
     } else {
    
     }

   })
}
  }
  jquery_code() {
    $(document).ready(function () { });
  }
  loadcart() {
    this.cart.getCart().subscribe((data) => {
      this.book$ = data;
      if (this.book$.cartItems[0] == undefined) {
   window.location.assign('/books')
      }

      this.cartitem = this.book$.cartItems[0].cart
      for (var { book: books } of this.cartitem) {
        this.cartitem1 = books;
        this.cartitem2.push(this.cartitem1);
      }
      let cartitem3 = this.cartitem2;
      for (var { _id: id } of this.cartitem2) {
        this.pid1.push(id);
      }
      console.log(this.cartitem.length)
      if (this.cartitem.length == 0) {
        this.router.navigate(['/books']);
      }
      this.subtotal = this.book$.subtotal;
      this.totalweight = this.book$.totalweight;
      this.amountpayable = this.subtotal;

    });
  }

  getadd() {
    this.gettingadd.getaddress().subscribe((resp) => {
      this.address = resp.address

      this.addlength = this.address.length;


    }, (error) => {
      console.log(error)
    })
  }

  getaddid(add) {
    this.address_id = add._id

    this.placebutton = true
    this.selected = !this.selected;
    this.toastr.success('this is Address selected' + ' ' + add.fullName + ' ' + add.address + ' ' + add.pinCode, 'BooksByWeight', {
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

    let res = this.order.postorder(this.address_id, this.order1);
    res.subscribe((response) => {
      this.order2 = response
      this.options.order_id = response.sub.id
      this.options.amount = response.sub.amount

      console.log(this.order2)
      this.toastr.success('Order Successfully Created', 'BooksByWeight', {
        timeOut: 1000,

      });
    })
    this.placebutton = false
    this.selected = false;
  }
  showadd() {
    this.selected = true
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ordersaved();
  }

}