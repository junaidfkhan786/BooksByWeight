import { WishlistService } from './../services/wishlist.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {
  book$: any = [];
  Error = false;
  message: any;
  length: any;
  constructor(
    private toastr: ToastrService,
    private wish: WishlistService,
    private router: Router,
    private cart: CartService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
this.spinner.show();
    this.wish.getwishlistload().subscribe(() => {
      this.loadwish();
    })
    this.loadwish();
    this.jquery_code();


  }
  jquery_code() {
    $(document).ready(function () {


    });
  }

  loadwish() {
    if (localStorage.getItem('User')) {
      this.wish.getwish().subscribe(data => {

        this.book$ = data;
        this.length = data.books.length;
this.spinner.hide();
        //  this.book$.books[0].book.book_img[0]
      })
    } else {
      this.spinner.show();
      this.Error = true;
      setTimeout(() => {
        
        this.router.navigate(['/login']);
      }, 1000);
      this.toastr.error('YOU NEED TO LOGIN', 'BooksByWeight', { timeOut: 3000 });
this.spinner.hide();
    }

  }

  public deletePro(WishlistId) {
    this.spinner.show();
    this.wish.deleteProduct(WishlistId).subscribe(res => {
      this.toastr.error('Product Has Been Remove', 'BooksByWeight', { timeOut: 2000 });

    });
  }

  addCart(_id, selling_price, weight) {
    this.spinner.show();
    if (localStorage.getItem('User') != null) {

      this.cart.postProduct(_id, selling_price, weight).subscribe(() => {
this.spinner.hide();
        this.toastr.success('Product Successfully Added to cart', 'BooksByWeight', {
          timeOut: 1000,

        });
      })
    }


  }

}
