import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlistitem',
  templateUrl: './wishlistitem.component.html',
  styleUrls: ['./wishlistitem.component.css']
})
export class WishlistitemComponent implements OnInit {
  book$: any = [];
  Error = false;
  message: any;
  length: any;
 @Input() productItem:any
  constructor(
    private toastr: ToastrService,
    private wish: WishlistService,
    private router: Router,
    private cart: CartService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

  }


  public deletePro(WishlistId) {
    this.spinner.show();
    this.wish.deleteProduct(WishlistId).subscribe(res => {
      this.toastr.error('Product Has Been Remove', 'BooksByWeight', { timeOut: 2000 });

    });
  }

  addCart(_id, final_price,sale_price, weight) {
    var price:any
    if(sale_price > 0){
      price = sale_price
    }else{
      price = final_price
    }
    this.spinner.show();
    if (localStorage.getItem('User') != null) {

      this.cart.postProduct(_id, price, weight).subscribe(() => {
        this.deletePro(_id)
        this.spinner.hide();
        this.toastr.success('Product Successfully Added to cart', 'BooksByWeight', {
          timeOut: 1000,

        });
      })
    }


  }

}
