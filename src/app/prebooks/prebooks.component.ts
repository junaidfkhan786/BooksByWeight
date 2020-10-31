import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';
import { WishlistService } from '../services/wishlist.service';
import { FilterService } from '../services/filter.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../services/cart.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-prebooks',
  templateUrl: './prebooks.component.html',
  styleUrls: ['./prebooks.component.css']
})
export class PrebooksComponent implements OnInit {
  zero: any = '0/100';
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
  config: any
  PriceName: any
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private newService: BooksService,
    private route: ActivatedRoute,
    private filter: FilterService,
    private wish: WishlistService,
    private spinner: NgxSpinnerService,
    private cart: CartService,
    private location: Location
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: ''
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);
  }
  ngOnInit(): void {
    window.scrollTo(0, 200);
    this.spinner.show();
    if (localStorage.getItem('User') != null) {
      this.wish.getwishlistload().subscribe(() => {
        this.loadwish();
      })
      this.loadcart();
    }

    this.jquery_code();
    this.loadfilter();
    window.scroll(0, 0)
  }
  goback() {
    window.scroll(0, 0)

    // this.location.back();
    window.scroll(0, 0)

    if (this.router.url === '/prebooks') {
      this.router.navigate(['/'])
    } else if (this.router.url === '/prebooks?page=1' || this.router.url === '/prebooks?page=2') {
      this.router.navigate(['/'])
    } else if (this.router.url === '/prebooks?page=1243') {
      this.router.navigate(['/'])
    } else {
      this.router.navigate(['/'])
    }
    // window.location.reload()
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
    console.log(this.router.url)
    if (this.router.url == '/prebooks' || this.router.url == '/prebooks?page=' + this.config.currentPage) {
      this.router.navigate(['prebooks/'], { queryParams: { page: page } });
      this.loadbook(page)
    } else if (this.router.url == '/prebooks/sortBy' + this.zero ||
      this.router.url == '/prebooks/sortBy' + this.zero + '?page=' + this.config.currentPage) {
      console.log('first block')
      this.router.navigate(['prebooks/sortBy' + this.zero], { queryParams: { page: page } });
      this.filters(this.zero, page)

    } else if (this.router.url == '/prebooks/sortBy' + this.first ||
      this.router.url == '/prebooks/sortBy' + this.first + '?page=' + this.config.currentPage) {
      console.log('first block')
      this.router.navigate(['prebooks/sortBy' + this.first], { queryParams: { page: page } });
      this.filters(this.first, page)

    } else if (this.router.url == '/prebooks/sortBy' + this.second ||
      this.router.url == '/prebooks/sortBy' + this.second + '?page=' + this.config.currentPage) {
      console.log('second block')
      this.router.navigate(['prebooks/sortBy' + this.second], { queryParams: { page: page } });
      this.filters(this.second, page)
    } else if (this.router.url == '/prebooks/sortBy' + this.third ||
      this.router.url == '/prebooks/sortBy' + this.third + '?page=' + this.config.currentPage) {
      console.log('third block')
      this.router.navigate(['prebooks/sortBy' + this.third], { queryParams: { page: page } });
      this.filters(this.third, page)
    } else if (this.router.url == '/prebooks/sortBy' + this.fourth ||
      this.router.url == '/prebooks/sortBy' + this.fourth + '?page=' + this.config.currentPage) {
      console.log('fourth block')
      this.router.navigate(['prebooks/sortBy' + this.fourth], { queryParams: { page: page } });
      this.filters(this.fourth, page)
    } else if (this.router.url == '/prebooks/sortBy500' ||
      this.router.url == '/prebooks/sortBy500' + '?page=' + this.config.currentPage) {
      console.log('fifth block')
      this.router.navigate(['prebooks/sortBy500'], { queryParams: { page: page } });
      this.filters(this.fifth, page)
    } else if (this.router.url == '/prebooks/sortByasc' ||
      this.router.url == '/prebooks/sortByasc' + '?page=' + this.config.currentPage) {
      console.log('sixth block')
      this.router.navigate(['/prebooks/sortByasc'], { queryParams: { page: page } });
      this.filtersSort(this.variant1, page)
    } else if (this.router.url == '/prebooks/sortBydesc' ||
      this.router.url == '/prebooks/sortBydesc' + '?page=' + this.config.currentPage) {
      console.log('seventh block')
      this.router.navigate(['prebooks/sortBydesc'], { queryParams: { page: page } });
      this.filtersSort(this.variant, page)
    } else {
      alert('not found')
    }



    window.scrollTo(0, 200);
  }
  loadbook(p) {
    console.log(p)
    console.log(this.config.currentPage)
    this.newService.getPreBooks(p).pipe(
      map((resp) => {
        var book = resp.books
        var newbooks = [];
        var uniqueObject = {};
        var allbooks = []
        allbooks = book
        localStorage.setItem('allbooks',JSON.stringify(allbooks))

        for (let i in book) {

          let objTitle = book[i]['Isbn_no'];


          uniqueObject[objTitle] = book[i];
        }


        for (let i in uniqueObject) {
          newbooks.push(uniqueObject[i]);
        }

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
  filters(modal: String, page) {
    this.filter.priceDefinepre(modal, page).pipe(
      map((resp) => {
        var book = resp.books
        var newbooks = [];
        var uniqueObject = {};

        var allbooks = []
        allbooks = book
        localStorage.setItem('allbooks',JSON.stringify(allbooks))
        for (let i in book) {

          let objTitle = book[i]['Isbn_no'];


          uniqueObject[objTitle] = book[i];
        }


        for (let i in uniqueObject) {
          newbooks.push(uniqueObject[i]);
        }

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
    ).subscribe((res) => {
      this.books$ = res
      this.config.totalItems = this.books$.totalBooks
      console.log(res)
      if(this.router.url.includes('0/100')){
        this.PriceName = 'Price / 0/100'
      }else if(this.router.url.includes('100/200')){
        this.PriceName = 'Price / 100/200'
      }else if(this.router.url.includes('200/300')){
        this.PriceName = 'Price / 200/300'
      }else if(this.router.url.includes('300/400')){
        this.PriceName = 'Price / 300/400'
      }else if(this.router.url.includes('400/500')){
        this.PriceName = 'Price / 400/500'
      }else if(this.router.url.includes('500')){
        this.PriceName = 'Price / 500 OnWards'
      }
      if (this.books$.totalBooks != 0) { this.spinner.hide() }
    });
  }
  filtersSort(variant: String, page) {
    this.filter.sortBypre(variant, page).pipe(
      map((resp) => {
        var book = resp.books
        var newbooks = [];
        var uniqueObject = {};
        var allbooks = []
        allbooks = book
        localStorage.setItem('allbooks',JSON.stringify(allbooks))

        for (let i in book) {

          let objTitle = book[i]['Isbn_no'];


          uniqueObject[objTitle] = book[i];
        }


        for (let i in uniqueObject) {
          newbooks.push(uniqueObject[i]);
        }

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
    ).subscribe((res) => {
      this.books$ = res
      this.config.totalItems = this.books$.totalBooks
      console.log(res)
      if (this.router.url.includes('asc')) {
        this.PriceName = 'Low To High'
      } else {
        this.PriceName = 'High To Low'
      }
      if (this.books$.totalBooks != 0) { this.spinner.hide() }
    });
  }

  loadfilter() {

    if (this.router.url == '/prebooks' || this.router.url == '/prebooks?page=' + this.config.currentPage) {
      var a = window.location.href
      var b = a.substring(a.lastIndexOf('=') + 1);
      console.log(b)
      if (this.router.url == '/prebooks') {
        this.router.navigate(['/prebooks'], { queryParams: { page: this.config.currentPage } })
        this.loadbook(1)
      } else {
        this.loadbook(this.config.currentPage)
      }

    } else if (this.router.url == '/prebooks/sortBy' + this.zero ||
      this.router.url == '/prebooks/sortBy' + this.zero + '?page=' + this.config.currentPage) {
      if (this.router.url == '/prebooks/sortBy' + this.zero) {
        this.router.navigate(['/prebooks/sortBy' + this.zero], { queryParams: { page: this.config.currentPage } })
        this.filters(this.zero, 1);
      } else {
        this.filters(this.zero, this.config.currentPage);
      }

    } else if (this.router.url == '/prebooks/sortBy' + this.first ||
      this.router.url == '/prebooks/sortBy' + this.first + '?page=' + this.config.currentPage) {
      if (this.router.url == '/prebooks/sortBy' + this.first) {
        this.router.navigate(['/prebooks/sortBy' + this.first], { queryParams: { page: this.config.currentPage } })
        this.filters(this.first, 1);
      } else {
        this.filters(this.first, this.config.currentPage);
      }

    } else if (this.router.url == '/prebooks/sortBy' + this.second ||
      this.router.url == '/prebooks/sortBy' + this.second + '?page=' + this.config.currentPage) {
      if (this.router.url == '/prebooks/sortBy' + this.second) {
        this.router.navigate(['/prebooks/sortBy' + this.second], { queryParams: { page: this.config.currentPage } })
        this.filters(this.second, 1);
      } else {
        this.filters(this.second, this.config.currentPage);
      }

    } else if (this.router.url == '/prebooks/sortBy' + this.third ||
      this.router.url == '/prebooks/sortBy' + this.third + '?page=' + this.config.currentPage) {
      if (this.router.url == '/prebooks/sortBy' + this.third) {
        this.router.navigate(['/prebooks/sortBy' + this.third], { queryParams: { page: this.config.currentPage } })

        this.filters(this.third, 1);
      } else {
        this.filters(this.third, this.config.currentPage);
      }

    } else if (this.router.url == '/prebooks/sortBy' + this.fourth ||
      this.router.url == '/prebooks/sortBy' + this.fourth + '?page=' + this.config.currentPage) {
      if (this.router.url == '/prebooks/sortBy' + this.fourth) {
        this.router.navigate(['/prebooks/sortBy' + this.fourth], { queryParams: { page: this.config.currentPage } })
        this.filters(this.fourth, 1);
      } else {
        this.filters(this.fourth, this.config.currentPage);
      }

    } else if (this.router.url == '/prebooks/sortBy500' ||
      this.router.url == '/prebooks/sortBy500' + '?page=' + this.config.currentPage) {
      if (this.router.url == '/prebooks/sortBy500') {
        this.router.navigate(['/prebooks/sortBy' + this.fifth], { queryParams: { page: this.config.currentPage } })
        this.filters(this.fifth, 1);
      } else {
        this.filters(this.fifth, this.config.currentPage);
      }

    } else if (this.router.url == '/prebooks/sortByasc' ||
      this.router.url == '/prebooks/sortByasc' + '?page=' + this.config.currentPage) {
      if (this.router.url == '/prebooks/sortByasc') {
        this.router.navigate(['/prebooks/sortBy' + this.variant1], { queryParams: { page: this.config.currentPage } })
        this.filtersSort(this.variant1, 1);
      } else {
        this.filtersSort(this.variant1, this.config.currentPage);
      }
    } else if (this.router.url == '/prebooks/sortBydesc' ||
      this.router.url == '/prebooks/sortBydesc' + '?page=' + this.config.currentPage) {
      if (this.router.url == '/prebooks/sortBydesc') {
        this.router.navigate(['/prebooks/sortBy' + this.variant], { queryParams: { page: this.config.currentPage } })
        this.filtersSort(this.variant, 1);
      } else {
        this.filtersSort(this.variant, this.config.currentPage);
      }
    }
  }
  public price0() {
    this.router.navigate(['prebooks/sortBy0/100']);
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
