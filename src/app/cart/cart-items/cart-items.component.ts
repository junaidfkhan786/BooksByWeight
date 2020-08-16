import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Orders } from 'src/app/models/orders.model';
import { UserAddressService } from 'src/app/services/user-address.service';
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
  address1_id: any;


  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router,
    private order: OrdersService,
    private gettingadd: UserAddressService,
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
      this.subtotal = this.book$.subtotal;
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
  delCart(_id) {
    this.cart.deleteProduct(_id).subscribe(() => {
      this.toastr.error('Product Has Been Remove', 'BooksByWeight', {
        timeOut: 1000,
      });
    });
  }
  increment(quantity, _id, price, weight) {
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

  createorder( addressid = this.address1_id, book = this.pid1, amount = this.subtotal, totalitems = this.cartitem2.length, totalweight = this.totalweight) {


    console.log(this.pid1)
    this.order1.book = book;
    this.order1.amount = amount;
    this.order1.totalitems = totalitems;
    this.order1.totalweight = totalweight;
    console.log(this.address1_id,this.order1)
  //   let res = this.order.postorder(addressid,this.order1);
  //   res.subscribe((response) => {
  //     this.order2 = response
  //     console.log(this.order2)
  //   })
  //   this.router.navigate[('checkout')];
  }

  getadd() {
    this.gettingadd.getaddress().subscribe((resp) => {

      this.address1_id = resp.address._id


    }, (error) => {



    })

  }

}
