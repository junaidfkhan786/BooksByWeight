import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  @Input() productItem: any;
  decre: number;
  incre: number;
  book$: any = [];
  cartitem: any = [];
  cartitem1: any = [];
  price: any;
  subtotal: any;
  totalweight:any;
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
  dec: boolean;
  totalw:any;
  constructor(private cart: CartService, private toastr: ToastrService) {}

  ngOnInit() {
    let cartitem6 = this.cartitem2;
    for (let user of cartitem6) {
    }
    this.loadcart();

    this.jquery_code();
  }

  jquery_code() {
    $(document).ready(function () {});
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

        for (var i = 0; i <= cartitem3.length; i++) {
          if (cartitem3[i] == undefined) {
            return false;
          }
          this.c = cartitem3[i].weight ;
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

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  increment(quantity, _id, price,weight) {
    if (localStorage.getItem('User') != null) {
      this.counterValue = quantity;
      this.counterValue++;

      this.cart.updateqty(this.counterValue, _id, price,weight).subscribe((d) => {
        this.toastr.success('Product Has Been updated', 'BooksByWeight', {
          timeOut: 1000,
        });
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  decrement(quantity, _id, price,weight) {
    if (localStorage.getItem('User') != null) {
      this.counterValue = quantity;
      this.counterValue--;

      this.cart.updateqty(this.counterValue, _id, price,weight).subscribe(() => {
        this.toastr.success('Product Has Been updated', 'BooksByWeight', {
          timeOut: 1000,
        });
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }
}
