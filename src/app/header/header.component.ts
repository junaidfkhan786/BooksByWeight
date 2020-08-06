import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $: any;
import * as jwt_decode from 'jwt-decode';
import { WishlistService } from '../services/wishlist.service';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  a: any = [];
  session = false;
  UserData: any;
  book1$:any = [];
  book$: any = [];
  Error = false;
  length: any;
  cartlen: any;
  constructor(
    private wish: WishlistService,
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    if(localStorage.getItem('User') != null){
      setInterval(() => {
        this.loadwish();
        this.loadcart();
      }, 1000);
    }
    


 
    
    this.jquery_code();
    this.isLogin();
  }
  loadwish() {
    this.wish.getwish().subscribe((data) => {
      this.book$ = data;
  //  this.length = this.book$.books.length;
    });
  }
  
  loadcart() {

      this.cart.getCart().subscribe((data) => {
        this.cartlen = data.cartItems.length;
        if(data.cartItems.length > 0){
          this.book1$ = data;
        }
  
    
       
      });
    
  }
  jquery_code() {
    $(document).ready(function () {
      // $(".dropdown").hover(function(){
      //     var dropdownMenu = $(this).children(".dropdown-menu");
      //     if(dropdownMenu.is(":visible")){
      //         dropdownMenu.parent().toggleClass("open");
      //     }
      // });
    });
  }
  isLogin() {
    
    if (localStorage.getItem('User') != null) {
      var token = localStorage.getItem('User');
      var decode = jwt_decode(token);
      this.UserData = decode;
      this.session = true;
    }
  }

  openSearch() {
    document.getElementById('myOverlay').style.display = 'block';
  }

  closeSearch() {
    document.getElementById('myOverlay').style.display = 'none';
  }
}
