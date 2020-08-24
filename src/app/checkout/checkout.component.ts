import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
import { Orders } from '../models/orders.model';
import { OrdersService } from '../services/orders.service';
import { UserAddressService } from '../services/user-address.service';
import { WindowRefService } from '../services/window-ref.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $: any;
@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    providers: [WindowRefService]
  })
  export class CheckoutComponent implements OnInit {
    shipping:any = 100;
    book$: any = [];
    cartitemlength:any;
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
rzp1:any;
  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router,
    private order: OrdersService,
    private gettingadd: UserAddressService,
    public windowref : WindowRefService
  ) {}
  ngOnInit(): void {

this.placebutton = false
    this.selected = true
    if(localStorage.getItem('User') !=null){
      this.gettingadd.getrefresuser().subscribe(() => {
        this.getadd();

      })
      this.getadd();

    }
   
this.loadcart();
    
   
    this.jquery_code();
  }

    options = {
       "key": "rzp_test_t9SNkyK0AYA0iV",
           "key_secret" : "2dNBmblDu5Pg4fc1zuDxiOwf",
        "currency": "INR",
        "amount": '',
        "name": "BooksByweight",
        "description": "Razor Test Transaction",
        "image": "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
        "order_id": '',
        "handler": function (response){
       if(response.razorpay_signature){
        Swal.fire(
          'Payment Successfull!',
          'success'
        )
       }else{
        Swal.fire(
          'Payment Failed!',
          'error'
        )
       }
         console.log(response.razorpay_payment_id)
   console.log(response.razorpay_order_id)
    console.log(response.razorpay_signature)
      }
    ,
        
        "theme": {
            "color": "#227254"
        }
    };

    public initPay():void {
       this.rzp1 = new this.windowref.nativeWindow.Razorpay(this.options);

       this.rzp1.open();

    }
paymenthandler(){
  
}
  jquery_code() {
    $(document).ready(function () { });
  }
  loadcart() {
    this.cart.getCart().subscribe((data) => {
      this.book$ = data;
      this.cartitem = this.book$.cartItems[0].cart
      if(this.book$.cartItems[0] == undefined){
        return false
      }
      console.log(this.cartitem.length)
      if(this.cartitem.length == 0 ){
        this.router.navigate(['/books']);
      }
      this.subtotal = this.book$.subtotal;
      this.totalweight = this.book$.totalweight;
      this.amountpayable = this.subtotal + this.shipping;

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
 showadd(){
   this.selected = true
 }

}