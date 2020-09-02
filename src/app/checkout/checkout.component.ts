import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
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
import { useradd } from '../models/useraddress.model';
import { ShipRocketOrders } from '../models/shiprocketorder.model';
import { map } from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [WindowRefService]
})
export class CheckoutComponent implements OnInit {
  book$: any = [];
  cartitemlength: any;
  cartitem: any = [];
  cartitem1: any = [];
  price: any;
  subtotal: any;
  totalweight: any;
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
  orderid1: any;
  paymentid: any;
  sig: any;
  amountpayable: any;
  selected: boolean;
  placebutton: boolean;
  rzp1: any;
  verifypay: Verifypayment = new Verifypayment();
  UserData: any;
  userid: any;
  totalitems: any
  total: number
  ordermodel: Orders;
  paymentbutton: boolean
  shiprocketmodel: ShipRocketOrders
kilo :string = ""
  shiporderid: any;
  shippingid: any;
  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router,
    private order: OrdersService,
    private gettingadd: UserAddressService,
    public windowref: WindowRefService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,

  ) {
    this.ordermodel = new Orders();
    this.shiprocketmodel = new ShipRocketOrders();
  }
  ngOnInit(): void {
    this.paymentbutton = false
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


  public initPay() {
    let options: any = {
      "key": "rzp_test_ImeRpaCPi1JD7v",
      "key_secret": "TpJ7W7kEA7NuwqtPwno8NQhl",
      "image": "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
      "currency": "INR",
      "amount": '',
      "name": "BooksByweight",
      "description": "Books By Weight Test Transaction",
      "order_id": '',
      "theme": {
        "color": "#227254"
      },

    };
    options.amount = this.amountpayable
    options.order_id = localStorage.getItem('orderid')
    options.handler = ((response) => {

      if (response.razorpay_order_id) {
        this.ordersaved(response);

      } else if (!response.razorpay_order_id) {
        Swal.fire(
          'Payment Aborted!',
          'error'
        )
      } else {
        Swal.fire(
          ' Canceled By User!',
          'error'
        )


      }
    });
    this.rzp1 = new this.windowref.nativeWindow.Razorpay(options);
    this.rzp1.open();
  }

  ordersaved(response) {
    localStorage.removeItem('orderid')
    this.orderid = response.razorpay_order_id
    this.paymentid = response.razorpay_payment_id
    this.sig = response.razorpay_signature
    var token = localStorage.getItem('User');
    var decode = jwt_decode(token);
    this.UserData = decode
    this.userid = this.UserData.userId
    this.ordermodel.amount = this.amountpayable,
      this.ordermodel.totalitems = this.totalitems,
      this.ordermodel.totalweight = this.totalweight
    this.ordermodel.book = this.pid1,

      this.order.verifypayment(this.orderid, this.paymentid, this.sig, this.ordermodel)
        .subscribe((data) => {
          console.log(data)
          this.getorder(this.orderid);
        })

  }
  getorder(orderid) {
    this.orderid = orderid
    this.order.GetOrderById(this.orderid)
      .pipe(
        map(
          (data) => {
            let orders: any = data[0].order_items
            for (var i = 0; i < orders.length; i++) {
              delete orders[i]['_id']
              if (orders[i].bookdetail) {
                orders[i].bookdetail['name'] = orders[i].bookdetail['book_name']
                delete orders[i].bookdetail['book_name']
                delete orders[i].bookdetail['id']
                delete orders[i].bookdetail['_id']
                orders[i].bookdetail['units'] = orders[i]['units']
                delete orders[i]['units']
                orders[i]['name'] = orders[i].bookdetail['name']
                orders[i]['selling_price'] = orders[i].bookdetail['selling_price']
                orders[i]['sku'] = orders[i].bookdetail['sku']
                orders[i]['units'] = orders[i].bookdetail['units']
                orders[i]['weight'] = orders[i].bookdetail['weight']
                delete orders[i].bookdetail['name']
                delete orders[i].bookdetail['selling_price']
                delete orders[i].bookdetail['sku']
                delete orders[i].bookdetail['units']
                delete orders[i].bookdetail['weight']
                delete orders[i]['bookdetail']
              }
            }
            console.log(data)
            return data
          }
        )
      )
      .subscribe((data) => {
        this.shipping(data)
      })
  }
  shipping(data) {
    let orders: any = data

    this.shiprocketmodel.order_id = orders[0].orderid;
    this.shiprocketmodel.order_date = orders[0].orderDate;
    this.shiprocketmodel.shipping_address = orders[0].address.address
    this.shiprocketmodel.billing_address = orders[0].address.city
    this.shiprocketmodel.billing_state = orders[0].address.state
    this.shiprocketmodel.billing_pincode = orders[0].address.pincode
    this.shiprocketmodel.sub_total = orders[0].amount
    this.shiprocketmodel.billing_customer_name = orders[0].address.fullname
    this.shiprocketmodel.billing_phone = orders[0].address.mobilenumber
    this.shiprocketmodel.order_items = orders[0].order_items
    this.shiprocketmodel.weight = this.totalweight
    this.order.shiprocketorder(this.shiprocketmodel).subscribe(
      (data) => {
        console.log(data)
        this.shippingresponse(data);
      }
    )

  }
  shippingresponse(data) {
    var token = localStorage.getItem('User');
    var decode = jwt_decode(token);
    this.UserData = decode
    this.userid = this.UserData.userId
    this.orderid
    this.shippingid = data.shipment_id;
    this.shiporderid = data.order_id
    this.order.shiprocketresponse(this.userid,this.orderid, this.shippingid, this.shiporderid)
    .subscribe((data1) => {
      console.log(data1)
      this.ngZone.run(
        () => this.router.navigate(['/cart', { query: "completed" }])
      ).then();
    },
      (error) => console.log(error),
      () => console.log("completed")

    )

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
      if (this.cartitem.length == 0) {
        this.router.navigate(['/books']);
      }
      let cart = this.book$.cartItems[0].cart
      var sum = 0
      for (let i = 0; i < cart.length; i++) {

        this.pid1.push({
          bookdetail: cart[i].book._id,
          units: cart[i].quantity
        })
        if (cart[i].quantity) {
          sum += +cart[i].quantity
        }

      }

      this.totalitems = sum
      this.subtotal = this.book$.subtotal;
      this.total = this.subtotal
      if (this.total <= 500) {
        var cal = 50 * this.totalitems
        this.total += cal
        console.log(this.totalitems)
      } else {
        this.total = this.total
      }
      this.subtotal = this.book$.subtotal;
      this.totalweight = this.book$.totalweight;
      this.amountpayable = this.total;
      if(this.totalweight > 0.999){
        this.kilo = "Kg"
      }else{
        this.kilo = "g"
      }
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
  getbillingadd(adds) {
    this.ordermodel.address = adds.address
    this.ordermodel.mobilenumber = adds.mobileNumber
    this.ordermodel.city = adds.city
    this.ordermodel.fullname = adds.fullName
    this.ordermodel.state = adds.state
    this.ordermodel.pincode = adds.pinCode
    this.paymentbutton = true
    this.placebutton = true
    this.selected = !this.selected;
    this.toastr.success('This Address Is Selected' + ' ' + adds.fullName + ' ' + adds.address + ' ' + adds.city + ' ' + adds.state + ' ' + adds.pinCode, 'BooksByWeight', {
      timeOut: 5000,
    });
  }

  showadd() {
    this.selected = true
  }
}