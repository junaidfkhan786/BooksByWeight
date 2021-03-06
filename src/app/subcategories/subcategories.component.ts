import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BooksService } from '../services/books.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { FilterService } from '../services/filter.service';
import { UrlService } from '../services/url.service';
import { WishlistService } from '../services/wishlist.service';
import { Location } from '@angular/common'
import { query } from '@angular/animations';
declare var $: any;
@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  zero: any = '0/100';
  first: any = '100/200';
  second: any = '200/300';
  third: any = '300/400';
  fourth: any = '400/500';
  fifth: any = '500/100000';
  variant1: any = 'asc';
  variant: any = 'desc';
  book_sec = false;
  books$: any = [];
  totalBooks: number;
  pages: number;
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
  cartpid1: any[] = [];
  token: string
  config: any
  i: number
  categoryname: any
  categoryid: any
  subcatname: any
  PriceName: any
  constructor(
    private toastr: ToastrService,
    private CatService: CategoryService,
    private router: Router,
    private newService: BooksService,
    private route: ActivatedRoute,
    private filter: FilterService,
    private wish: WishlistService,
    private spinner: NgxSpinnerService,
    private cart: CartService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private location: Location,
    private urlservice: UrlService
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
    this.spinner.show()
    this.activatedRoute.params.subscribe(res => {
      this.categoryid = res['query']

    });
    this.loadfilter();
    this.wish.getwishlistload().subscribe(() => {
      this.loadwish();
    })
    this.cart.getcartload().subscribe(() => {
      this.loadcart();
    })
    this.loadcart();
    this.loadwish();
    this.jquery_code();
    window.scroll(0, 0)

  }
  jquery_code() { }
  goback() {
    window.scroll(0, 0)

    // this.location.back();
    window.scroll(0, 0)


    this.router.navigate(['/'])

  }
  onPageChange(page: number) {
    this.spinner.show();
    console.log(this.router.url)
    if (this.router.url == '/subcategory/' + this.route.snapshot.params._id ||
      this.router.url == '/subcategory/' + this.route.snapshot.params._id + '?page=' + this.config.currentPage) {
      console.log('eight block')
      this.router.navigate(['subcategory/' + this.route.snapshot.params._id], { queryParams: { page: page } });
      this.loadcat(this.route.snapshot.params._id, page)

    } else if (this.router.url == '/subcategory/sortBy' + this.zero + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.zero + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      console.log('first block')
      this.router.navigate(['subcategory/sortBy0/100', { query: this.categoryid }], { queryParams: { page: page } });
      this.filters(this.zero, page, this.categoryid)

    } else if (this.router.url == '/subcategory/sortBy' + this.first + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.first + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      console.log('first block')
      this.router.navigate(['subcategory/sortBy100/200', { query: this.categoryid }], { queryParams: { page: page } });
      this.filters(this.first, page, this.categoryid)

    } else if (this.router.url == '/subcategory/sortBy' + this.second + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.second + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      console.log('second block')
      this.router.navigate(['subcategory/sortBy200/300', { query: this.categoryid }], { queryParams: { page: page } });
      this.filters(this.second, page, this.categoryid)
    } else if (this.router.url == '/subcategory/sortBy' + this.third + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.third + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      console.log('second block')
      this.router.navigate(['subcategory/sortBy300/400', { query: this.categoryid }], { queryParams: { page: page } });
      this.filters(this.third, page, this.categoryid)
    } else if (this.router.url == '/subcategory/sortBy' + this.fourth + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.fourth + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      console.log('second block')
      this.router.navigate(['subcategory/sortBy400/500', { query: this.categoryid }], { queryParams: { page: page } });
      this.filters(this.fourth, page, this.categoryid)
    } else if (this.router.url == '/subcategory/sortBy500' + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy500' + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      console.log('second block')
      this.router.navigate(['subcategory/sortBy500', { query: this.categoryid }], { queryParams: { page: page } });
      this.filters(this.fifth, page, this.categoryid)
    } else if (this.router.url == '/subcategory/sortBy' + this.variant1 + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.variant1 + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      console.log('second block')
      this.router.navigate(['subcategory/sortBy' + this.variant1, { query: this.categoryid }], { queryParams: { page: page } });
      this.filtersSort(this.categoryid, this.variant1, page)
    } else if (this.router.url == '/subcategory/sortBy' + this.variant + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.variant + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      console.log('second block')
      this.router.navigate(['subcategory/sortBy' + this.variant, { query: this.categoryid }], { queryParams: { page: page } });
      this.filtersSort(this.categoryid, this.variant, page)
    }
    // else if (this.router.url == '/subcategory/sortBy' + this.third ||
    //   this.router.url == '/subcategory/sortBy' + this.third + '?page=' + this.config.currentPage) {
    //   console.log('third block')
    //   this.router.navigate(['subcategory/sortBy' + this.third], { queryParams: { page: page } });
    //   this.filters(this.third, page)
    // } else if (this.router.url == '/subcategory/sortBy' + this.fourth ||
    //   this.router.url == '/subcategory/sortBy' + this.fourth + '?page=' + this.config.currentPage) {
    //   console.log('fourth block')
    //   this.router.navigate(['subcategory/sortBy' + this.fourth], { queryParams: { page: page } });
    //   this.filters(this.fourth, page)
    // } else if (this.router.url == '/subcategory/sortBy500' ||
    //   this.router.url == '/subcategory/sortBy500' + '?page=' + this.config.currentPage) {
    //   console.log('fifth block')
    //   this.router.navigate(['subcategory/sortBy500'], { queryParams: { page: page } });
    //   this.filters(this.fifth, page)
    // } else if (this.router.url == '/subcategory/sortByasc' ||
    //   this.router.url == '/subcategory/sortByasc' + '?page=' + this.config.currentPage) {
    //   console.log('sixth block')
    //   this.router.navigate(['/subcategory/sortByasc'], { queryParams: { page: page } });
    //   this.filtersSort(this.variant1, page)
    // } else if (this.router.url == '/subcategory/sortBydesc' ||
    //   this.router.url == '/subcategory/sortBydesc' + '?page=' + this.config.currentPage) {
    //   console.log('seventh block')
    //   this.router.navigate(['subcategory/sortBydesc'], { queryParams: { page: page } });
    //   this.filtersSort(this.variant, page)
    // } else {
    //   alert('not found')
    // }



    window.scrollTo(0, 200);
  }

  loadcat(id, page) {
    if (this.route.snapshot.params._id != undefined) {
      this.CatService.getallsub().subscribe((data) => {
        var cat: any = data;
        this.categoryid = this.route.snapshot.params._id
        // var id =  JSON.stringify(this.route.snapshot.params._id);
        console.log(this.categoryid)

        for (let i = 0; i < cat.length; i++) {
          if (cat[i]['_id'] == this.route.snapshot.params._id) {
            console.log('found')

            this.CatService.getSubCatById(id, page).pipe(
              map((resp) => {
                var book = resp.books
                var book = resp.books
                var newbooks = [];
                var uniqueObject = {};
                var allbooks = []
                allbooks = book
                localStorage.setItem('allbooks', JSON.stringify(allbooks))

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
              this.config.totalItems = this.books$.totalBooks;
              console.log(data)
              this.categoryname = this.books$.message
              var subcat = this.categoryname.subcategory
              for (let i = 0; i < subcat.length; i++) {
                if (this.categoryid == subcat[i]['_id']) {
                  this.subcatname = subcat[i]['name']
                }

              }
              this.spinner.hide();
              if (this.books$.totalBooks == 0) {
                Swal.fire({
                  title: 'No Books Are Available in This SubCategory?',
                  text: '',
                  icon: 'info',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Click Here!',
                  cancelButtonText: 'No, Your Wish!'
                }).then((result) => {
                  if (result.value) {
                    window.location.assign('/')
                  }
                })

              }
            }, (error) => {
              if (error) {
                Swal.fire({
                  title: 'Error Fething Category Books?',
                  text: '',
                  icon: 'error',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Click Here!',
                  cancelButtonText: 'No, Your Wish!'
                }).then((result) => {
                  if (result.value) {
                    window.location.assign('/')
                  }
                })
              }
            })

            break;
          }

        }

      })

    }
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
  filters(modal: String, page, catid) {
    this.filter.priceDefinesubcat(modal, page, catid).pipe(
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
      if (this.router.url.includes('0/100')) {
        this.PriceName = 'Price / 0/100'
      } else if (this.router.url.includes('100/200')) {
        this.PriceName = 'Price / 100/200'
      } else if (this.router.url.includes('200/300')) {
        this.PriceName = 'Price / 200/300'
      } else if (this.router.url.includes('300/400')) {
        this.PriceName = 'Price / 300/400'
      } else if (this.router.url.includes('400/500')) {
        this.PriceName = 'Price / 400/500'
      } else if (this.router.url.includes('500')) {
        this.PriceName = 'Price / 500 OnWards'
      }
      console.log(res)
      if (this.books$.totalBooks != 0) { this.spinner.hide() }
    });
  }
  filtersSort(catid: string, variant: String, page) {
    this.filter.sortBysubcat(catid, variant, page).pipe(
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
      if (this.router.url.includes('asc')) {
        this.PriceName = 'Low To High'
      } else {
        this.PriceName = 'High To Low'
      }
      console.log(res)
      if (this.books$.totalBooks != 0) { this.spinner.hide() }
    });
  }

  loadfilter() {

    if (this.router.url == '/subcategory/' + this.route.snapshot.params._id ||
      this.router.url == '/subcategory/' + this.route.snapshot.params._id + '?page=' + this.config.currentPage) {
      var id = this.route.snapshot.params._id
      if (this.router.url == '/subcategory/' + this.route.snapshot.params._id) {
        console.log(id)
        this.loadcat(id, 1)
        this.router.navigate(['subcategory/' + this.route.snapshot.params._id], { queryParams: { page: this.config.currentPage } });

      } else {
        var a = window.location.href
        var b = a.substring(a.lastIndexOf('=') + 1);
        console.log(b)
        this.loadcat(id, b);
      }

    } else if (this.router.url == '/subcategory/sortBy' + this.zero + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.zero + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      if (this.router.url == '/subcategory/sortBy' + this.zero + ';query=' + this.categoryid) {

        this.filters(this.zero, 1, this.categoryid);
      } else {
        this.filters(this.zero, this.config.currentPage, this.categoryid);
      }

    } else if (this.router.url == '/subcategory/sortBy' + this.first + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.first + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      if (this.router.url == '/subcategory/sortBy' + this.first + ';query=' + this.categoryid) {

        this.filters(this.first, 1, this.categoryid);
      } else {
        this.filters(this.first, this.config.currentPage, this.categoryid);
      }

    } else if (this.router.url == '/subcategory/sortBy' + this.second + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.second + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      if (this.router.url == '/subcategory/sortBy' + this.second + ';query=' + this.categoryid) {
        this.filters(this.second, 1, this.categoryid);
      } else {
        this.filters(this.second, this.config.currentPage, this.categoryid);
      }

    } else if (this.router.url == '/subcategory/sortBy' + this.third + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.third + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      if (this.router.url == '/subcategory/sortBy' + this.third + ';query=' + this.categoryid) {
        this.filters(this.third, 1, this.categoryid);
      } else {
        this.filters(this.third, this.config.currentPage, this.categoryid);
      }

    } else if (this.router.url == '/subcategory/sortBy' + this.fourth + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.fourth + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      if (this.router.url == '/subcategory/sortBy' + this.fourth + ';query=' + this.categoryid) {
        this.filters(this.fourth, 1, this.categoryid);
      } else {
        this.filters(this.fourth, this.config.currentPage, this.categoryid);
      }

    } else if (this.router.url == '/subcategory/sortBy500' + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy500' + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      if (this.router.url == '/subcategory/sortBy500' + ';query=' + this.categoryid) {
        this.filters(this.fifth, 1, this.categoryid);
      } else {
        this.filters(this.fifth, this.config.currentPage, this.categoryid);
      }

    } else if (this.router.url == '/subcategory/sortBy' + this.variant1 + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.variant1 + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      if (this.router.url == '/subcategory/sortBy' + ';query=' + this.categoryid) {
        console.log('filtersort')
        this.filtersSort(this.categoryid, this.variant1, 1);
      } else {
        this.filtersSort(this.categoryid, this.variant1, this.config.currentPage);
      }

    } else if (this.router.url == '/subcategory/sortBy' + this.variant + ';query=' + this.categoryid ||
      this.router.url == '/subcategory/sortBy' + this.variant + ';query=' + this.categoryid + '?page=' + this.config.currentPage) {
      if (this.router.url == '/subcategory/sortBy' + ';query=' + this.categoryid) {
        console.log('filtersort')
        this.filtersSort(this.categoryid, this.variant, 1);
      } else {
        this.filtersSort(this.categoryid, this.variant, this.config.currentPage);
      }

    }

    // }
    // else if (this.router.url == '/subcategory/sortByasc' ||
    //   this.router.url == '/subcategory/sortByasc' + '?page=' + this.config.currentPage) {
    //   if (this.router.url == '/subcategory/sortByasc') {
    //     this.filtersSort(this.variant1, 1);
    //   } else {
    //     this.filtersSort(this.variant1, this.config.currentPage);
    //   }
    // } else if (this.router.url == '/subcategory/sortBydesc' ||
    //   this.router.url == '/subcategory/sortBydesc' + '?page=' + this.config.currentPage) {
    //   if (this.router.url == '/subcategory/sortBydesc') {
    //     this.filtersSort(this.variant, 1);
    //   } else {
    //     this.filtersSort(this.variant, this.config.currentPage);
    //   }
    // }
  }
  public price0() {
    this.router.navigate(['subcategory/sortBy0/100', { query: this.categoryid }]);
  }
  public price() {
    this.router.navigate(['subcategory/sortBy100/200', { query: this.categoryid }]);
  }
  public price1() {
    this.router.navigate(['subcategory/sortBy200/300', { query: this.categoryid }]);
  }
  public price2() {
    this.router.navigate(['subcategory/sortBy300/400', { query: this.categoryid }]);
  }
  public price3() {
    this.router.navigate(['subcategory/sortBy400/500', { query: this.categoryid }]);
  }
  public price4() {
    this.router.navigate(['subcategory/sortBy500', { query: this.categoryid }]);
  }
  public lowTohigh() {
    this.router.navigate(['subcategory/sortByasc', { query: this.categoryid }]);
  }
  public highTolow() {
    this.router.navigate(['subcategory/sortBydesc', { query: this.categoryid }]);
  }
  loadwish() {
    if (localStorage.getItem('User') != null) {
      this.wish.getwish().subscribe((data) => {
        this.wish$ = data;
        const size = this.wish$.books;
        for (var { book: books } of size) {
          this.wid = books;
          const size1 = books._id;
          this.wid1.push(size1);
        }
      });
    }
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

}
