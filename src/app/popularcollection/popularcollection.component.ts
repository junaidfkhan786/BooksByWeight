import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BooksService } from './../services/books.service';
import { WishlistService } from '../services/wishlist.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
declare var $: any;
@Component({
  selector: 'app-popularcollection',
  templateUrl: './popularcollection.component.html',
  styleUrls: ['./popularcollection.component.css'],
})
export class PopularcollectionComponent implements OnInit {
  books$: any = [];
  wish$: any = [];
  wid: any = [];
  wid1: any = [];
  cartquantity: any = [];
  cartquantity1: any = [];
  cartpid: any = {};
  cartitem: any = [];
  cartpid1: any[] = [];
  book$: any = [];
  length: any;
spinner : boolean = true;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: [
      "<i class='fas fa-angle-left'></i>",
      "<i class='fas fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
    },
    nav: false,
  };

  constructor(
    private toastr: ToastrService,
    private newService: BooksService,
    private wish: WishlistService,
    private router: Router,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.loadbook();

    if(localStorage.getItem('User') !=null){
      this.cart.getcartload().subscribe(()=>{
        this.loadcart();
      })
      this.wish.getwishlistload().subscribe(() => {
        this.loadwish();
      })
      this.loadcart();
      this.loadwish();
    }

    this.jquery_code();
  }

  loadcart() {
    if (localStorage.getItem('User') != null) {
      this.cart.getCart().subscribe((data) => {
        this.book$ = data;
        if (this.book$.cartItems.length > 0) {

          this.cartitem = this.book$.cartItems[0].cart;
          this.length = this.cartitem.length;
        }
        if (this.book$.cartItems.length > 0) {
          this.cartquantity = this.book$.cartItems[0].cart;

          for (var { book: books } of this.cartquantity) {
            this.cartpid = books;
            const size3 = books._id;
            this.cartpid1.push(size3);
          }
        }
      });
    }
  }

  jquery_code() {
    $(document).ready(function () {});
  }

  loadbook() {
    this.newService.getPopularBooks().pipe(
      map((resp) => {
        var book = resp.books
       var newbooks = [];
       var uniqueObject = {};


              for (let i in book) {

               let objTitle = book[i]['Isbn_no'];


                uniqueObject[objTitle] = book[i];
            }


            for (let i in uniqueObject) {
                newbooks.push(uniqueObject[i]);
            }
            var total = 20 - newbooks.length
            resp['totalBooks'] = resp.totalBooks - total
            resp['books'] = newbooks
        for (let i = 0; i < book.length; i++) {
          book[i]['mrp_inr'] = Math.floor(book[i]['mrp_inr'])
          book[i]['rate'] = Math.floor(book[i]['rate'])
          book[i]['weight'] = Math.floor(book[i]['weight'])
          book[i]['sale_disc_inr'] = Math.floor(book[i]['sale_disc_inr'])
          book[i]['sale_disc_per'] = Math.floor(book[i]['sale_disc_per'])
          book[i]['discount_per'] = Math.floor(book[i]['discount_per'])
          book[i]['discount_rs'] = Math.floor(book[i]['discount_rs'])
          book[i]['final_price'] = Math.floor(book[i]['final_price'])
          book[i]['sale_rate'] = Math.floor(book[i]['sale_rate'])
          book[i]['sale_price'] = Math.floor(book[i]['sale_price'])
        }
        return resp
      })
    ).subscribe((data) => {
      this.books$ = data;
      this.spinner = false;

    });
  }
  productHome(_id) {
    window.open('details/' + _id);
  }
  addWish(_id) {
    if (localStorage.getItem('User')) {
      this.wish.postProduct(_id).subscribe(
        (res) => {
          this.toastr.success('Product Successfully Added', 'BooksByWeight', {
            timeOut: 3000,
          });
        },
        (err) => {
          this.toastr.warning('Product already Added', 'BooksByWeight', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
  loadwish() {
    this.wish.getwish().subscribe((data) => {
      this.wish$ = data;

      const size = this.wish$.books;

      for (var { book: books } of size) {
        this.wid = books;

        const size1 = books._id;

        this.wid1.push(size1);
      }
      for (let w of this.wid1) {
      }
    });
  }
}
