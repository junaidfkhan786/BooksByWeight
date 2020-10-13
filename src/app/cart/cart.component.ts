import { map } from 'rxjs/operators';
import { Component, OnInit, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as jwt_decode from 'jwt-decode';
import { Location } from '@angular/common';
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
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private location:Location
  ) { }

  ngOnInit() {
    window.scrollTo(0, 10);
    this.loadroute();
    this.spinner.show();
    this.cart.getcartload().subscribe(() => {
      this.loadcart();
    })
    this.loadcart();

    this.jquery_code();
  }
  jquery_code() {
    /* Jquery here */
  }
  goback(){
    window.scroll(0,0)
    this.location.back()
  }
  loadroute() {
    this.activatedRoute.params.subscribe(res => {
      var message = res['query'];
      localStorage.removeItem('shiprocket')
      if (message) {
        Swal.fire({
          title: 'Your Order Has Been Confirmed?',
          text: 'We Inform You When Your Order Has Been Shipped?',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Done'
        }).then((result) => {
          if (result.value) {
            window.location.assign('/profile')
            // this.ngZone.run(() => this.router.navigate(['/books'])).then();
          }
        })
      }
    });
  }
  loadcart() {
    if (localStorage.getItem('User') != null) {
      this.cart.getCart().pipe(
        map((data)=>{
          var book$ = data;
          if (book$.cartItems.length > 0) {
            var cartitem = book$.cartItems[0].cart;
            for (let i = 0; i < cartitem.length; i++) {
              console.log(cartitem)
              if (cartitem[i].book == null || cartitem[i].book.quantity == 0 ) {
                var id = cartitem[i]._id
                this.cart.deleteProduct(id).subscribe(() => {
                  Swal.fire({
                    icon: 'info',
                    title: 'Sorry...',
                    text: 'Some Book In Your Cart Are Sold ',
                  })
                  this.spinner.hide();
                });

              } else {

              }
            }


          }
          return book$
        })
      ).subscribe((resp) => {
        this.book$ = resp;
        if (this.book$.cartItems.length > 0) {
          this.cartitem = this.book$.cartItems[0].cart;
          this.length = this.cartitem.length;
        }
        this.spinner.hide();
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
