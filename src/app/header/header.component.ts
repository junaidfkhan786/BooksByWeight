import { query } from '@angular/animations';
import { Searchs } from './../models/search.model';

import { SearchService } from './../services/search.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
import * as jwt_decode from 'jwt-decode';
import { WishlistService } from '../services/wishlist.service';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UserEditService } from '../services/user-edit.service';
import { map } from 'rxjs/operators';
import { BooksService } from '../services/books.service';
import { CategoryService } from '../services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  a: any = [];
  querys: any;
  session = false;
  UserData: any;
  book1$: any = [];
  book$: any = [];
  Error = false;
  length: any;
  cartlen: any;
  selector: any = [];
  selected: any;
  Searchinput: any;
  length1: any;
  category:any
  category$: any;
  constructor(
    private wish: WishlistService,
    private cart: CartService,
    private toastr: ToastrService,
    private router: Router,
    private Searching: SearchService,
    private useredit: UserEditService,
    private bookservice:CategoryService,
    private spinner:NgxSpinnerService
  ) { }
  ngOnInit() {
this.loadcat()
    this.selection();
    if (localStorage.getItem('User') != null) {
      this.cart.getcartload().subscribe(() => {
        this.loadcart();
      })
      this.wish.getwishlistload().subscribe(() => {
        this.loadwish();
      })

      this.loadwish();
      this.loadcart();
      this.isLogin();

    }
    this.jquery_code();

  }
  gotocat(_id){
    this.router.navigate(['categories/' + _id])
    window.location.reload()
  }
  loadcat(){
    this.bookservice.getCategory().pipe(
      map((data)=>{
        var cat:any = []
        cat = data
        for (let i = 0; i < cat.length; i++) {
        if(cat[i].icon){
          cat[i]['icon_name'] = cat[i]['icon']
          delete cat[i]['icon']
        }
        }
        return data
      } )
    )
      .subscribe((data) =>{
        this.spinner.hide();
        this.category$ = data
        this.category = this.category$;

      }
      );
  }
  loadwish() {
    this.wish.getwish().subscribe((data) => {

      this.book$ = data;
      this.length1 = this.book$.books.length;
    });
  }
  loadcart() {

    this.cart.getCart().subscribe((data) => {
      if (this.cartlen === undefined) {
        this.cartlen = "0"

      }

      if (data.cartItems[0]) {

        this.cartlen = data.cartItems[0].cart.length
        if (data.cartItems.length > 0) {
          this.book1$ = data;
        }

      }
    });
  }
  logout() {
    localStorage.removeItem('User');
    window.location.reload();
    this.router.navigate(['/']);
    this.toastr.success('Logout Successfull', 'BooksByWeight', {
      timeOut: 1000,
    });
  }
  jquery_code() {
    $(document).ready(function () {

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
  search(selected, Searchinput) {

    var _id = Searchinput + "&" + selected
    console.log(_id)
    this.router.navigate(['search/'+ _id]);
    // window.location.assign('search/'+_id)
  }


  selection() {
    this.selector = [
      { name: "Book Name", value: "book_name=1" },
      { name: "Author Name", value: "author_name=1" },
      { name: "ISBN", value: "isbn=1" },
      { name: "Publisher", value: "publisher=1" },
    ];
    this.selected = this.selector[0].value
  }

  abouts = 'assets/policies/AboutUs.pdf'
  Payments = 'assets/policies/Payments.pdf'
  PrivacyPolicy = 'assets/policies/PrivacyPolicy.pdf'
  Returns = 'assets/policies/Returs&Refunds.pdf'
  Shippings = 'assets/policies/Shipping.pdf'
  terms = 'assets/policies/Terms&Conditions.pdf'
  copy = 'assets/policies/CopyrightPolicy.pdf'
  about(){
    window.open(this.abouts);
  }
  Terms(){
    window.open(this.terms);
  }
  Return(){
    window.open(this.Returns);
  }
  Shipping(){
    window.open(this.Shippings);
  }
  Copyright(){
    window.open(this.copy);
  }
  Privacy(){
    window.open(this.PrivacyPolicy);
  }
  Payment(){
    window.open(this.Payments);
  }
window(){
  window.scrollTo(0, 10);
}

gotonewbooks(){
window.location.assign('newbooks')
}
gotoprebooks(){
  window.location.assign('prebooks')
}
gotobooks(){
  window.location.assign('books')
}
}
