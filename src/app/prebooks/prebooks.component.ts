import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';
import { WishlistService } from '../services/wishlist.service';
import { FilterService } from '../services/filter.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../services/cart.service';
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
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private newService: BooksService,
    private route: ActivatedRoute,
    private filter: FilterService,
    private wish: WishlistService,
    private spinner: NgxSpinnerService,
    private cart: CartService
  ) { }

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
  loadbook() {
    this.newService.getPreBooks().subscribe((data) => {
      this.books$ = data;

      const pid = data.books;
      for (var { _id: id } of pid) {
        this.pid1.push(id);
      }
      this.totalBooks = data.totalBooks;
      this.pages = 1;
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
  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 520);
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
    if (this.router.url == '/prebooks') {
      this.loadbook();
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
