import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';
import { WishlistService } from '../services/wishlist.service';
import { FilterService } from '../services/filter.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../services/cart.service';
import { map } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-prebooks',
  templateUrl: './prebooks.component.html',
  styleUrls: ['./prebooks.component.css']
})
export class PrebooksComponent implements OnInit {
  first: any = '100/200';
  second: any = '200/300';
  third: any = '300/400';
  fourth: any = '400/500';
  fifth: any = '500/10000';
  variant1: any = 'asc';
  variant: any = 'desc';
  book_sec = false;
  books$: any = [];
  totalBooks: number;
  pages: number = 1;
  bookId: any;
  wish$: any = [];
  wid: any = {};
  size: any = {};
  Error = false;
  message: any;
  length: any;
  wid1: number[] = [];
  pid: any = [];
  pid1: any = [];
  match: any;
  books: any = [];
  book$: any = [];
  cartitem: any = [];
  book1: any = [];
  cartquantity: any = [];
  cartquantity1: any = [];
  cartpid: any = {};
  cartpid1: number[] = [];
  config:any
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private newService: BooksService,
    private route: ActivatedRoute,
    private filter: FilterService,
    private wish: WishlistService,
    private spinner: NgxSpinnerService,
    private cart: CartService
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems:''
      };
      route.queryParams.subscribe(
      params => this.config.currentPage= params['page']?params['page']:1 );
   }
  ngOnInit(): void {
    this.spinner.show();
    if (localStorage.getItem('User') != null) {
      this.wish.getwishlistload().subscribe(() => {
        this.loadwish();
      })

    }
    this.loadcart();
    this.jquery_code();
    this.loadfilter();
  }

  loadcart() {
    if (localStorage.getItem('User') != null) {
      this.cart.getCart().subscribe((data) => {
        this.book$ = data;
        if (this.book$.cartItems.length > 0) {
          if (this.book$.cartItems[0] == undefined) {
            return false
          }

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
  jquery_code() { }
  onPageChange(page: number) {
    this.spinner.show();
    this.router.navigate(['/prebooks'], { queryParams: { page: page } });
    this.loadbook(page)
    window.scrollTo(0, 200);
  }
  loadbook(p) {
    console.log(p)
    console.log(this.config.currentPage)
    this.newService.getPreBooks(p).pipe(
      map((resp) => {
        var book = resp.books
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
          book[0]['sale_price'] = 0
        }
        return resp
      })
    ).subscribe((data) => {
      this.books$ = data;
      const pid = data.books;
      for (var { _id: id } of pid) {
        this.pid1.push(id);
      }
      console.log(data)
      this.config.totalItems = this.books$.totalBooks;
      this.spinner.hide();
    });
  }

  /* Set the width of the side navigation to 250px */
  public openNav() {
    $('#mySidenav').css('width', '400px');
  }
  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }
  on() {
    document.getElementById('overlay').style.display = 'block';
  }
  off() {
    document.getElementById('overlay').style.display = 'none';
  }
  filters(modal: String) {
    this.filter.priceDefinepre(modal).subscribe((res) => {
      this.books$ = res;
      console.log(this.books$)
      this.totalBooks = this.books$.totalBooks
      console.log(this.totalBooks)
      this.spinner.hide();

    });
  }
  filtersSort(variant1: String) {
    this.filter.sortBypre(variant1).subscribe((res) => {
      this.books$ = res;
      this.totalBooks = this.books$.totalBooks
      this.spinner.hide();
    });
  }

  loadfilter() {
    if (this.router.url == '/prebooks/sortBy100/200') {
      this.filters(this.first);

    }
    if (this.router.url == '/prebooks/sortBy200/300') {
      this.filters(this.second);
    }
    if (this.router.url == '/prebooks/sortBy300/400') {
      this.filters(this.third);
    }
    if (this.router.url == '/prebooks/sortBy400/500') {
      this.filters(this.fourth);
    }
    if (this.router.url == '/prebooks/sortBy500') {
      this.filters(this.fifth);
    }
    if (this.router.url == '/prebooks' || this.router.url == '/prebooks?page='+this.config.currentPage) {
      var a = window.location.href
      var b = a.substring(a.lastIndexOf('=') + 1);
      console.log(b)
      if(this.router.url == '/prebooks'){
        this.loadbook(1)
      }else{
        this.loadbook(b)
      }

  }
    if (this.router.url == '/prebooks/sortByasc') {
      this.filtersSort(this.variant1);
    }
    if (this.router.url == '/prebooks/sortBydesc') {
      this.filtersSort(this.variant);

    }

  }
  public price() {
    this.router.navigate(['prebooks/sortBy100/200']);
  }
  public price1() {
    this.router.navigate(['prebooks/sortBy200/300']);
  }
  public price2() {
    this.router.navigate(['prebooks/sortBy300/400']);
  }
  public price3() {
    this.router.navigate(['prebooks/sortBy400/500']);
  }
  public price4() {
    this.router.navigate(['prebooks/sortBy500']);
  }
  public lowTohigh() {
    this.router.navigate(['/prebooks']);

  }
  public highTolow() {
    this.router.navigate(['prebooks/sortBydesc']);

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
