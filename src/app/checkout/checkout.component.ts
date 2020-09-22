import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
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
import { Coupons } from '../models/coupons.model';
import { CoupontransferService } from '../services/coupontransfer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [WindowRefService]
})
export class CheckoutComponent implements OnInit {
  add: useradd;
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
  kilo: string = ""
  shiporderid: any;
  shippingid: any;
  coupons: Coupons
  couponid: any
  coupon_code: any
  coupon_amount: any
  percentage: any
  expiry_date: any
  @ViewChild('addform') addform: NgForm;
  button: boolean;
  formbutton: boolean;
  div: boolean;
  but: boolean;
  addid: any;
  messageadd: string;
  length: any;
  prefillmob:number;
  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router,
    private order: OrdersService,
    private gettingadd: UserAddressService,
    public windowref: WindowRefService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private coupontransfer: CoupontransferService,
    private spinner: NgxSpinnerService

  ) {
    this.add = new useradd();
    this.ordermodel = new Orders();
    this.shiprocketmodel = new ShipRocketOrders();
    this.coupons = new Coupons();
    this.coupontransfer.couponid.subscribe((couponid) => {
      this.couponid = couponid
    })
    this.coupontransfer.coupon_code.subscribe((coupon_code) => {
      this.coupon_code = coupon_code
    })
    this.coupontransfer.coupon_amount.subscribe((coupon_amount) => {
      this.coupon_amount = coupon_amount
    })
    this.coupontransfer.percentage.subscribe((percentage) => {
      this.percentage = percentage
    })
    this.coupontransfer.expiry_date.subscribe((expiry_date) => {
      this.expiry_date = expiry_date
    })
  }



  ngOnInit() {
   
    window.scrollTo(0, 10);
    this.spinner.show();
    this.button = true
    this.div = false
    this.but = true

    this.paymentbutton = false
    this.placebutton = false
    this.selected = true
    if (localStorage.getItem('User') != null) {
      this.gettingadd.getrefresuser().subscribe(() => {
        this.getadd();
      })
      this.getadd();
    }
    this.getcoupon();
    this.loadcart();
    this.jquery_code();
    setTimeout(() => {
      this.getcoupon();
    }, 2000);

  }


  public initPay() {
    let options: any = {
      "key": "rzp_test_71mNw1EKfYn4AM",
      "key_secret": "uUXOT1421l8Zb7Mack8eFAzI",
      "image": "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
      "currency": "INR",
      "amount": '',
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      "prefill": {
        "email": '',
        "contact": ''
      },
      "name": "BooksByweight",
      "description": "Books By Weight Test Transaction",
      "order_id": '',
      "theme": {
        "color": "#227254"
      },

    };
    var usertoken = localStorage.getItem('User');
    var decode = jwt_decode(usertoken);
    options.prefill.email = decode.email;
    options.prefill.contact =   this.ordermodel.mobilenumber
    options.amount = this.amountpayable;
    options.order_id = localStorage.getItem('orderid')
    options.handler = ((response) => {

      if (response.razorpay_order_id) {
        this.spinner.show();
        this.ordersaved(response);

      } else if (!response.razorpay_order_id) {
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed!',
          text: 'If Your Money Is Debited From Your Bank Dont Panic We Are Refunding Your Money In 4 To 5 Workimg Days Here Is Your Order Id'+this.orderid+'Send This Order Id To info@booksbyweight.com!',
        })
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
  edit(add) {
    this.button = false
    this.formbutton = true
    this.div = true
    this.addform.setValue({
      fullName: add.fullName,
      mobileNumber: add.mobileNumber,
      alternatePhoneNumber: add.alternatePhoneNumber,
      address: add.address,
      state: add.state,
      city: add.city,
      landmark: add.landmark,
      pinCode: add.pinCode
    })
    this.addid = add._id
  }
  submitadd() {
    if (this.addform.valid) {
      if (this.formbutton) {
        let respedit = this.gettingadd.editaddress(this.addid, this.add);
        respedit.subscribe((res) => {
          this.addform.resetForm();
          this.formbutton = false
          this.div = !this.div
          this.button = !this.button
          this.spinner.hide();
        })
      } else {
        let resp = this.gettingadd.postadd(this.add)
        resp.subscribe((response) => {
          this.div = false;
          this.but = true;
          this.formbutton = true
          this.button = true
          this.spinner.hide();
        }, (error) => {
          this.messageadd = error.error.message
          console.log(this.messageadd)
        })
      }
    }
  }
  showadds() {
    this.div = !this.div
    this.button = !this.button
    this.formbutton = false
    this.addform.resetForm();
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
      this.ordermodel.coupon_code = this.coupons._id

    if (this.coupons.coupon_code == null) {
      this.ordermodel.isCouponApplied = false
    } else {
      this.ordermodel.isCouponApplied = true
    }
    console.log(this.orderid,this.paymentid,this.sig ,this.ordermodel)

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
                orders[i]['selling_price'] = Math.floor(orders[i].bookdetail['final_price'])
                orders[i]['sku'] = orders[i].bookdetail['sku']
                orders[i]['units'] = orders[i].bookdetail['units']
                orders[i]['weight'] = orders[i].bookdetail['weight']
                delete orders[i].bookdetail['name']
                delete orders[i].bookdetail['final_price']
                delete orders[i].bookdetail['sku']
                delete orders[i].bookdetail['units']
                delete orders[i].bookdetail['weight']
                delete orders[i]['bookdetail']
              }
            }
            return data
          }
        )
      )
      .subscribe((data) => {
        console.log(data)
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
    this.order.shiprocketresponse(this.userid, this.orderid, this.shippingid, this.shiporderid)
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
      if (this.totalweight > 0.999) {
        this.kilo = "Kg"
      } else {
        this.kilo = "g"
      }
    });
  }
  getadd() {
    this.gettingadd.getaddress().subscribe((resp) => {
      this.spinner.hide();
      this.address = resp.address
      this.addlength = this.address.length;
      if (this.address.length == 0) {
        this.div = !this.div
        this.but = !this.but
      }
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
    Swal.fire(
      'This Address Is Selected',
      ' ' + adds.fullName + ' ' + adds.address + ' ' + adds.city + ' ' + adds.state + ' ' + adds.pinCode,
      'success'
    )
    // this.toastr.success('This Address Is Selected' + ' ' + adds.fullName + ' ' + adds.address + ' ' + adds.city + ' ' + adds.state + ' ' + adds.pinCode, 'BooksByWeight', {
    //   timeOut: 5000,
    // });
  }

  showadd() {
    window.scrollTo(0, 10);
    this.selected = true
  }
  ngAfterViewInit(): void {
    
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const couponsobj = {
      coupon_code: this.coupon_code,
      percentage: this.percentage,
      coupon_amount: this.coupon_amount,
      expiry_date: this.expiry_date,
      couponid: this.couponid
    }

  }

  getcoupon() {
    let coupon_code = this.coupon_code
    let percentage = this.percentage
    let coupon_amount = this.coupon_amount
    let expiry_date = this.expiry_date
    let couponid = this.couponid
    this.coupons._id = couponid
    this.coupons.coupon_code = coupon_code
    this.coupons.percentage = percentage
    this.coupons.coupon_amount = coupon_amount
    this.coupons.expiry_date = expiry_date

    if (this.coupons.percentage == false) {
      if (this.coupons.coupon_amount == this.amountpayable) {
        this.amountpayable = 0
        this.subtotal = 0
      } else {
        this.subtotal -= this.coupons.coupon_amount
        this.amountpayable -= this.coupons.coupon_amount
      }

    } else {
      if (this.coupons.coupon_amount == 100) {
        this.amountpayable = 0
        this.subtotal = 0
      } else {
        this.subtotal -= this.subtotal / 100 * this.coupons.coupon_amount
        this.amountpayable -= this.total / 100 * this.coupons.coupon_amount
      }
    }
  }
  del(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.gettingadd.deladd(id).subscribe((del) => {
          this.spinner.hide()
          if (this.address.length == 0) {
            this.div = !this.div
            this.but = !this.but
          }
        })
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary Address is safe :)',
          'error'
        )
      }
    })
  }
}