import Swal from 'sweetalert2/dist/sweetalert2.js';
import { filter, map } from 'rxjs/operators';
import { Component, OnInit, EventEmitter, NgZone } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../services/filter.service';
import { CategoryService } from '../services/category.service';
import { WishlistService } from '../services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'
import { CartService } from '../services/cart.service';
import { BooksService } from '../services/books.service';
import { UrlService } from '../services/url.service';
import {Location} from '@angular/common'
declare var $: any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
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
    private location:Location,
    private urlservice:UrlService
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: ''
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);
  }
  ngOnInit() {

    window.scrollTo(0, 200);
    this.spinner.show()
    this.activatedRoute.params.subscribe(res => {
      this.token = res['token']
      if (this.token) {
        console.log(this.token)
        localStorage.setItem("User", JSON.stringify(this.token))
        setTimeout(() => {
          this.ngZone.run(() => this.router.navigate(['/cart'])).then();
        }, 2000);

      } else {
        console.log('Token From Mobile App Not Fetch ')
      }
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


  }
  jquery_code() { }
  goback(){
    window.scroll(0,0)
    this.location.back()
  }
  onPageChange(page: number) {
    this.spinner.show();
    console.log(this.router.url)
    if (this.router.url == '/books' || this.router.url == '/books?page=' + this.config.currentPage) {
      this.router.navigate(['books/'], { queryParams: { page: page } });
      this.loadbook(page)
    } else if (this.router.url == '/books/sortBy' + this.first ||
      this.router.url == '/books/sortBy' + this.first + '?page=' + this.config.currentPage) {
      console.log('first block')
      this.router.navigate(['books/sortBy' + this.first], { queryParams: { page: page } });
      this.filters(this.first, page)

    } else if (this.router.url == '/books/sortBy' + this.second ||
      this.router.url == '/books/sortBy' + this.second + '?page=' + this.config.currentPage) {
      console.log('second block')
      this.router.navigate(['books/sortBy' + this.second], { queryParams: { page: page } });
      this.filters(this.second, page)
    } else if (this.router.url == '/books/sortBy' + this.third ||
      this.router.url == '/books/sortBy' + this.third + '?page=' + this.config.currentPage) {
      console.log('third block')
      this.router.navigate(['books/sortBy' + this.third], { queryParams: { page: page } });
      this.filters(this.third, page)
    } else if (this.router.url == '/books/sortBy' + this.fourth ||
      this.router.url == '/books/sortBy' + this.fourth + '?page=' + this.config.currentPage) {
      console.log('fourth block')
      this.router.navigate(['books/sortBy' + this.fourth], { queryParams: { page: page } });
      this.filters(this.fourth, page)
    } else if (this.router.url == '/books/sortBy500' ||
      this.router.url == '/books/sortBy500' + '?page=' + this.config.currentPage) {
      console.log('fifth block')
      this.router.navigate(['books/sortBy500'], { queryParams: { page: page } });
      this.filters(this.fifth, page)
    } else if (this.router.url == '/books/sortByasc' ||
      this.router.url == '/books/sortByasc' + '?page=' + this.config.currentPage) {
      console.log('sixth block')
      this.router.navigate(['/books/sortByasc'], { queryParams: { page: page } });
      this.filtersSort(this.variant1, page)
    } else if (this.router.url == '/books/sortBydesc' ||
      this.router.url == '/books/sortBydesc' + '?page=' + this.config.currentPage) {
      console.log('seventh block')
      this.router.navigate(['books/sortBydesc'], { queryParams: { page: page } });
      this.filtersSort(this.variant, page)
    }else if(this.router.url == '/books/'+this.route.snapshot.params._id ||
    this.router.url == '/books/'+this.route.snapshot.params._id+'?page='+this.config.currentPage){
      console.log('eight block')
      this.router.navigate(['books/'+this.route.snapshot.params._id], { queryParams: { page: page } });
      this.loadcat(this.route.snapshot.params._id,page)
      this.loadsubcat(this.route.snapshot.params._id,page)
    } else {
      alert('not found')
    }



    window.scrollTo(0, 200);
  }
  loadbook(p) {
    console.log(p)
    this.newService.getBooks(p).pipe(
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
      console.log(data)
      const pid = data.books;
      for (var { _id: id } of pid) {
        this.pid1.push(id);
      }

      this.config.totalItems = this.books$.totalBooks;
      this.spinner.hide();
    });
  }

  loadcat(id,page) {
    if (this.route.snapshot.params._id != undefined) {
      this.CatService.getCategory().subscribe((data) => {
        var cat: any = data;
        // var id =  JSON.stringify(this.route.snapshot.params._id);
        console.log(this.route.snapshot.params._id)

        for (let i = 0; i < cat.length; i++) {
          if (cat[i]['_id'] == this.route.snapshot.params._id) {
            console.log('found')

            this.CatService.getCategoryById(id,page).pipe(
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
                    // var total = 20 - newbooks.length
                    // resp['totalBooks'] = resp.totalBooks - total
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
              this.spinner.hide();
              if (this.books$.totalBooks == 0) {
                Swal.fire({
                  title: 'No Books Are Available On This Category?',
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
  loadsubcat(id,page) {
    if (this.route.snapshot.params._id != undefined) {

      this.CatService.getallsub().subscribe((data) => {
        var subcat: any = data

        for (let i = 0; i < subcat.length; i++) {
          if (subcat[i]['_id'] == this.route.snapshot.params._id) {
            console.log('found')

            this.CatService.getSubCatById(id,page).pipe(
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
                    // var total = 20 - newbooks.length
                    // resp['totalBooks'] = resp.totalBooks - total
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
              this.spinner.hide();
              if (this.books$.totalBooks == 0) {
                Swal.fire({
                  title: 'No Books Are Available On This SubCategory?',
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
                  title: 'Error Fething SubCategory Books?',
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

            break
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
  filters(modal: String, page) {
    this.filter.priceDefine(modal, page).pipe(
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
        }
        return resp
      })
    ).subscribe((res) => {
      this.books$ = res
      this.config.totalItems = this.books$.totalBooks
      console.log(res)
      if (this.books$.totalBooks != 0) { this.spinner.hide() }
    });
  }
  filtersSort(variant: String, page) {
    this.filter.sortBy(variant, page).pipe(
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
        }
        return resp
      })
    ).subscribe((res) => {
      this.books$ = res
      this.config.totalItems = this.books$.totalBooks
      console.log(res)
      if (this.books$.totalBooks != 0) { this.spinner.hide() }
    });
  }

  loadfilter() {

    if (this.router.url == '/books' || this.router.url == '/books?page=' + this.config.currentPage) {
      var a = window.location.href
      var b = a.substring(a.lastIndexOf('=') + 1);
      console.log(b)
      if (this.router.url == '/books') {
        this.loadbook(1)
      } else {
        this.loadbook(this.config.currentPage)
      }

    } else if (this.router.url == '/books/sortBy' + this.first ||
      this.router.url == '/books/sortBy' + this.first + '?page=' + this.config.currentPage) {
      if (this.router.url == '/books/sortBy' + this.first) {
        this.filters(this.first, 1);
      } else {
        this.filters(this.first, this.config.currentPage);
      }

    } else if (this.router.url == '/books/sortBy' + this.second ||
      this.router.url == '/books/sortBy' + this.second + '?page=' + this.config.currentPage) {
      if (this.router.url == '/books/sortBy' + this.second) {
        this.filters(this.second, 1);
      } else {
        this.filters(this.second, this.config.currentPage);
      }

    } else if (this.router.url == '/books/sortBy' + this.third ||
      this.router.url == '/books/sortBy' + this.third + '?page=' + this.config.currentPage) {
      if (this.router.url == '/books/sortBy' + this.third) {
        this.filters(this.third, 1);
      } else {
        this.filters(this.third, this.config.currentPage);
      }

    } else if (this.router.url == '/books/sortBy' + this.fourth ||
      this.router.url == '/books/sortBy' + this.fourth + '?page=' + this.config.currentPage) {
      if (this.router.url == '/books/sortBy' + this.fourth) {
        this.filters(this.fourth, 1);
      } else {
        this.filters(this.fourth, this.config.currentPage);
      }

    } else if (this.router.url == '/books/sortBy500' ||
      this.router.url == '/books/sortBy500' + '?page=' + this.config.currentPage) {
      if (this.router.url == '/books/sortBy500') {
        this.filters(this.fifth, 1);
      } else {
        this.filters(this.fifth, this.config.currentPage);
      }

    } else if (this.router.url == '/books/sortByasc' ||
      this.router.url == '/books/sortByasc' + '?page=' + this.config.currentPage) {
      if (this.router.url == '/books/sortByasc') {
        this.filtersSort(this.variant1, 1);
      } else {
        this.filtersSort(this.variant1, this.config.currentPage);
      }
    } else if (this.router.url == '/books/sortBydesc' ||
      this.router.url == '/books/sortBydesc' + '?page=' + this.config.currentPage) {
      if (this.router.url == '/books/sortBydesc') {
        this.filtersSort(this.variant, 1);
      } else {
        this.filtersSort(this.variant, this.config.currentPage);
      }
    }else if(this.router.url == '/books/'+this.route.snapshot.params._id ||
    this.router.url == '/books/'+this.route.snapshot.params._id+'?page='+this.config.currentPage){
      var id = this.route.snapshot.params._id
      if(this.router.url == '/books/'+this.route.snapshot.params._id){
        console.log(id)
        this.loadcat(id,1)
        this.loadsubcat(id,1)
      }else{
        var a = window.location.href
        var b = a.substring(a.lastIndexOf('=') + 1);
        console.log(b)
        this.loadcat(id,b);
        this.loadsubcat(id,b);
      }

    }
  }
  public price() {
    this.router.navigate(['books/sortBy100/200']);
  }
  public price1() {
    this.router.navigate(['books/sortBy200/300']);
  }
  public price2() {
    this.router.navigate(['books/sortBy300/400']);
  }
  public price3() {
    this.router.navigate(['books/sortBy400/500']);
  }
  public price4() {
    this.router.navigate(['books/sortBy500']);
  }
  public lowTohigh() {
    this.router.navigate(['books/sortByasc']);
  }
  public highTolow() {
    this.router.navigate(['books/sortBydesc']);
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
