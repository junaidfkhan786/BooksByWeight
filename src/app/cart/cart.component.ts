import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  /* JavaScript here */
  book$: any = [];
  Error = false;
  message: any;
  length: any;
  cartitem: any = [];
  constructor(
    private toastr: ToastrService,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart.getcartload().subscribe(() => {
      this.loadcart();
    })
    this.loadcart();

    this.jquery_code();
  }
  jquery_code() {
    /* Jquery here */
  }

  loadcart() {
    if (localStorage.getItem('User') != null) {
      this.cart.getCart().subscribe((data) => {
        this.book$ = data;
        if (this.book$.cartItems.length > 0) {
          this.cartitem = this.book$.cartItems[0].cart;
          this.length = this.cartitem.length;
        }
      });
    } else {
      this.Error = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
      this.toastr.error('YOU NEED TO LOGIN', 'BooksByWeight', {
        timeOut: 3000,
      });
    }
  }
}
