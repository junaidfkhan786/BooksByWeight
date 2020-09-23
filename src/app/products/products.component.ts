import Swal from 'sweetalert2/dist/sweetalert2.js';
import { map } from 'rxjs/operators';
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
  fifth: any = '500/10000';
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
  config:any
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
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems:''
      };
      route.queryParams.subscribe(
      params => this.config.currentPage= params['page']?params['page']:1 );
   }
  ngOnInit() {

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
    this.loadcat();
    // this.loadsubcat();
    this.jquery_code();
    this.loadsubcat();

  }
  jquery_code() { }
  onPageChange(page: number) {
    this.spinner.show();
    this.router.navigate(['books/'], { queryParams: { page: page } });
    this.loadbook(page)
    window.scrollTo(0, 200);
  }
  loadbook(p) {
    console.log(p)
    console.log(this.config.currentPage)
    this.newService.getBooks(p).pipe(
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

  loadcat() {
    if (this.route.snapshot.params._id != undefined) {

      this.CatService.getCategory().subscribe((data) => {
        var cat: any = data;
        // var id =  JSON.stringify(this.route.snapshot.params._id);
        console.log(this.route.snapshot.params._id)
        for (let i = 0; i < cat.length; i++) {
          if (cat[i]['_id'] == this.route.snapshot.params._id) {
            var id = this.route.snapshot.params._id
            this.CatService.getCategoryById(id).subscribe((data) => {
              this.books$ = data;
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
            },(error)=>{
              if(error){
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
            console.log('found')
            break;
          }

        }

      })

    }
  }
  loadsubcat() {
    if (this.route.snapshot.params._id != undefined) {

      this.CatService.getallsub().subscribe((data) => {
        var subcat: any = data
        for (let i = 0; i < subcat.length; i++) {
          if (subcat[i]['_id'] == this.route.snapshot.params._id) {
            var id = this.route.snapshot.params._id
            this.CatService.getSubCatById(id).subscribe((data) => {
              this.books$ = data;
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
            console.log('found')
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
  filters(modal: String) {
    this.filter.priceDefine(modal).subscribe((res) => {
      this.books$ = res;
      console.log(this.books$)
      if (this.books$.totalBooks != 0) { this.spinner.hide() }
    });
  }
  filtersSort(variant: String) {
    this.filter.sortBy(variant).subscribe((res) => {
      this.books$ = res;
      console.log(this.books$)
      if (this.books$.totalBooks != 0) { this.spinner.hide() }
    });
  }

  loadfilter() {
    if (this.router.url == '/books/sortBy100/200') {
      this.filters(this.first);
    }
    if (this.router.url == '/books/sortBy200/300') {
      this.filters(this.second);
    }
      if (this.router.url == '/books' || this.router.url == '/books?page='+this.config.currentPage) {
        var a = window.location.href
        var b = a.substring(a.lastIndexOf('=') + 1);
        console.log(b)
        if(this.router.url == '/books'){
          this.loadbook(1)
        }else{
          this.loadbook(b)
        }

    }
    if (this.router.url == '/books/sortBy300/400') {
      this.filters(this.third);
    }
    if (this.router.url == '/books/sortBy400/500') {
      this.filters(this.fourth);
    }
    if (this.router.url == '/books/sortBy500') {
      this.filters(this.fifth);
    }
    if (this.router.url == '/books/sortByasc') {
      this.filtersSort(this.variant1);
    }
    if (this.router.url == '/books/sortBydesc') {
      this.filtersSort(this.variant);
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
