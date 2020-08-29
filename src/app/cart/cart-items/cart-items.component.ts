import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Orders } from 'src/app/models/orders.model';
import { UserAddressService } from 'src/app/services/user-address.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jwt_decode from 'jwt-decode';
declare var $: any;
@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  @Input() productItem: any;
  book$: any = [];
  cartitem: any = [];
  cartitem1: any = [];
  price: any;
  subtotal: any;
  totalweight: any;
  total:number;
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
  length:number;
totalitems:number;
orderid:any;
  UserData: any;
  userid: any;
  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router,
    private order: OrdersService,
    private gettingadd: UserAddressService,
    private spinner : NgxSpinnerService
  ) {
  }
  ngOnInit() {
    this.getadd();
    this.loadcart();
    this.jquery_code();
  }
  jquery_code() {
    $(document).ready(function () { });
  }
  productHome(_id) {
    this.router.navigate(['details/' + _id]);
  }
  loadcart() {
    this.cart.getCart().subscribe((data) => {
      this.book$ = data;
      let cart = this.book$.cartItems[0].cart
      var sum = 0
      for (let i = 0; i < cart.length; i++) {
       if(cart[i].quantity){
         sum += +cart[i].quantity
        }
      }
      this.totalitems = sum
      this.subtotal = this.book$.subtotal;
      this.total = this.subtotal
    if(this.total <= 500){
      var cal =  50 * this.totalitems 
      this.total += cal
    }else{
      this.total = this.total
    }
      this.totalweight = this.book$.totalweight;
    });
  }
  delCart(_id) {
    this.spinner.show();
    this.cart.deleteProduct(_id).subscribe(() => {
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
  gotocheckout(){
    var token = localStorage.getItem('User');
    var decode = jwt_decode(token);
    this.UserData = decode
    this.userid = this.UserData.userId
   this.order.postorder(this.total,this.userid).subscribe((data)=>{
    let response =  data
    console.log(response)
    this.orderid = response.sub.id
    localStorage.setItem('orderid', this.orderid)
    this.router.navigate(['/checkout'])
   })
  }
}
