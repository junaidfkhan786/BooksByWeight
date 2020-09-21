import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Orders } from 'src/app/models/orders.model';
import { UserAddressService } from 'src/app/services/user-address.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jwt_decode from 'jwt-decode';
import { AdminCouponService } from 'src/app/services/admin-coupon.service';
import { useradd } from 'src/app/models/useraddress.model';
import { Coupons } from 'src/app/models/coupons.model';
import { CoupontransferService } from 'src/app/services/coupontransfer.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare var $: any;
@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  i:number
  @Input() productItem: any;
  book$: any = [];
  cartitem: any = [];
  cartitem1: any = [];
  price: any;
  subtotal: any;
  totalweight: any;
  total: number;
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
  totalw: any;
  pid1: any = [];
  message: any;
  address1_id: any;
  length: number;
  totalitems: number;
  orderid: any;
  UserData: any;
  userid: any;
  kilo: string = ""
  allcoupons: any = []
  pages: number;
  coupons: Coupons
  t:any
  s:any
  // coupons = {
  //   _id: null,
  //   coupon_code: null,
  //   coupon_amount: null,
  //   percentage:null,
  //   expiry_date: null
  // }
  couponhide: boolean = true
  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router,
    private order: OrdersService,
    private gettingadd: UserAddressService,
    private spinner: NgxSpinnerService,
    private couponservice: AdminCouponService,
    private coupontransfer: CoupontransferService
  ) {
    this.coupons = new Coupons();
  }
  ngOnInit() {
    this.getadd();
    this.loadcart();
    this.getallcoupons();
    this.jquery_code();
    this.loadimg()
  }
  bookimg: any[] = [];
  img:any = []
  
    loadimg() {
      // var book:[] = this.productItem.cart

      // for (let i = 0; i < book.length; i++) {

        
      // }
  //     this.bookimg = this.productItem.cart.book

      
  // //  var img:any = []
  //     for (let i = 0; i < this.bookimg.length; i++) {
  //       this.img.push(this.bookimg[i].toUpperCase())
     
  //       // if (this.bookimg[i] == "https://booksimg.s3.us-east-2.amazonaws.com/") {
  //       //   this.bookimg.splice(i, 1); i--;
  //       // }
  //     }
  //     for (let i = 0; i < this.img.length; i++) {
      
   
  //       if (this.img[i] == "HTTPS://BOOKSIMG.S3.US-EAST-2.AMAZONAWS.COM/") {
  //         this.img.splice(i, 1); i--;
  //       }
  //     }
  //     this.bookimg.splice(0,this.bookimg.length)
  //     this.bookimg = this.img
  //     this.productItem.cart.book['book_img'] = this.bookimg
  
    }
  jquery_code() {
    $(document).ready(function () { });
  }
  productHome(_id) {
    this.router.navigate(['details/' + _id]);
  }
  loadcart() {
    this.cart.getCart().subscribe((data) => {
      this.spinner.hide();
      this.book$ = data;
      let cart = this.book$.cartItems[0].cart
      var sum = 0
      for (let i = 0; i < cart.length; i++) {
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
      } else {
        this.total = this.total
      }
      this.totalweight = this.book$.totalweight;
      if (this.totalweight > 0.999) {
        this.kilo = "Kg"
      } else {
        this.kilo = "g"
      }
    });
  }
  delCart(_id) {
    this.spinner.show();
    this.cart.deleteProduct(_id).subscribe(() => {
      window.scrollTo(0, 10);
      this.toastr.error('Product Has Been Remove', 'BooksByWeight', {
        timeOut: 1000,
      });
    });
  }
  increment(quantity, _id, price, weight) {
    this.spinner.show();
    if (localStorage.getItem('User') != null) {
      this.counterValue = quantity;
      this.counterValue++;
      this.cart.updateqty(this.counterValue, _id, price, weight).subscribe((d) => {
        this.toastr.success('Product Has Been updated', 'BooksByWeight', {
          timeOut: 1000,
        });
      });
    }
  }
  decrement(quantity, _id, price, weight) {
    this.spinner.show();
    if (localStorage.getItem('User') != null) {
      this.counterValue = quantity;
      this.counterValue--;
      this.cart.updateqty(this.counterValue, _id, price, weight).subscribe(() => {
        this.toastr.success('Product Has Been updated', 'BooksByWeight', {
          timeOut: 1000,
        });
      });
    }
  }
  getadd() {
    this.gettingadd.getaddress().subscribe((resp) => {
      this.address1_id = resp.address._id
    }, (error) => {
    })
  }
  gotocheckout() {

    if (this.coupons.coupon_code == null) {
      this.coupons._id = null
      this.coupons.coupon_amount = null
      this.coupons.coupon_code = null
      this.coupons.expiry_date = null
      this.coupons.percentage = null
    }
    var token = localStorage.getItem('User');
    var decode = jwt_decode(token);
    this.UserData = decode
    this.userid = this.UserData.userId
    this.order.postorder(this.total, this.userid).subscribe((data) => {
      let response = data
      let token = data.token
      localStorage.setItem('shiprocket', token)
      console.log(response)
      this.orderid = response.sub.id
      localStorage.setItem('orderid', this.orderid)
      this.spinner.show();
      window.scrollTo(0, 10);
      this.router.navigate(['/checkout'])
    })
  }

  getallcoupons() {
    this.couponservice.getcoupon().subscribe((data) => {
      // var token = localStorage.getItem('User');
      // var decode = jwt_decode(token);
      // this.UserData = decode.userId;
      this.allcoupons = data
      // for (let i = 0; i < this.allcoupons.length; i++) {
      //   for (let j = 0; j < this.allcoupons[i].user.length; j++) {

      //     if (this.allcoupons[i].user[j]._id == this.UserData) {

      //       delete this.allcoupons[i]['_id']
      //       delete this.allcoupons[i]['coupon_amount']
      //       delete this.allcoupons[i]['coupon_code']
      //       delete this.allcoupons[i]['created_at']
      //       delete this.allcoupons[i]['expiry_date']
      //       delete this.allcoupons[i]['percentage']


      //     }

      //   }

      // }
    })
  }

  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 450);
  }

  select(data) {
    let coup = data
    // var token = localStorage.getItem('User');
    // var decode = jwt_decode(token);
    // this.UserData = decode.userId;
    // let a: boolean = false
    // for (let i = 0; i < coup.user.length; i++) {
    //   if (coup.user[i]._id == this.UserData) {
    //     a = true
    //     break
    //   }

    // }
    // if (a == true) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'This Coupon Is Used By You Please Choose Different Coupon!',
    //   })
    // } else {

      this.couponhide = false
      this.coupons.coupon_code = coup.coupon_code
      this.coupons.coupon_amount = coup.coupon_amount
      this.coupons.expiry_date = coup.expiry_date
      this.coupons._id = coup._id
      this.coupons.percentage = coup.percentage
      this.coupontransfer.coupon_code.next(this.coupons.coupon_code)
      this.coupontransfer.coupon_amount.next(this.coupons.coupon_amount)
      this.coupontransfer.couponid.next(this.coupons._id)
      this.coupontransfer.expiry_date.next(this.coupons.expiry_date)
      this.coupontransfer.percentage.next(this.coupons.percentage)

      console.log(this.coupons)

      if (this.coupons.percentage == false) {
        if (this.coupons.coupon_amount == this.total) {
          this.s = this.subtotal
          this.t = this.total
          this.total = 0
          this.subtotal = 0
        } else {
          this.s = this.subtotal
          this.t = this.total
          this.subtotal -= this.coupons.coupon_amount
          this.total -= this.coupons.coupon_amount
        }

      } else {
        if (this.coupons.coupon_amount == 100) {
          this.s = this.subtotal
          this.t = this.total
          this.total = 0
          this.subtotal = 0
        } else {
          this.s = this.subtotal
          this.t = this.total
          this.subtotal -= this.subtotal / 100 * this.coupons.coupon_amount
          this.total -= this.total / 100 * this.coupons.coupon_amount
        }
      }
    // }

  }

  togglecoupon() {
    this.spinner.show();
    this.loadcart();
    this.coupons.coupon_code = null
    this.coupons.coupon_amount = null
    this.coupons.expiry_date = null
    this.coupons._id = null
    this.coupons.percentage = null
    this.couponhide = true


  }
  
  return(){
    let Returns = 'assets/policies/Returs&Refunds.pdf'
    window.open(Returns);
  }
}
