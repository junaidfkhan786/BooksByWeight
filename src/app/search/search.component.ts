import { SearchService } from './../services/search.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, DefaultUrlSerializer, Router, UrlSerializer, UrlTree } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterService } from '../services/filter.service';
import { WishlistService } from '../services/wishlist.service';
import { map } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, UrlSerializer {

  totalBooks: number;
  message: string;
  query: string;
  books: any = [];
  count: any;
  first: any = '100/200';
  second: any = '200/300';
  third: any = '300/400';
  fourth: any = '400/500';
  fifth: any = '500/10000';
  variant1: any = 'asc';
  variant: any = 'desc';
  wish$: any = [];
  wid: any = [];
  wid1: number[] = [];
  pages: number = 1;
  config: any
  constructor(
    private search: SearchService,
    private Spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private filter: FilterService,
    private wish: WishlistService,
  ) {

    this.config = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: ''
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);

  }
  parse(url: any): UrlTree { let dus = new DefaultUrlSerializer(); return dus.parse(url); }
  serialize(tree: UrlTree): any {
    let dus = new DefaultUrlSerializer(), path = dus.serialize(tree); // use your regex to replace as per your requirement.
    return path
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/gi, '$')
      .replace(/%2C/gi, ',')
      .replace(/%3B/gi, ';')
      .replace(/%20/gi, '+')
      .replace(/%3D/gi, '=')
      .replace(/%3F/gi, '?')
      .replace(/%2F/gi, '/')
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.loadroute()
    });
    this.Spinner.show()
    this.loadwish();
    this.jquery_code();
    // this.loadfilter();
  }
  loadroute() {

    this.query = this.route.snapshot.params._id
    console.log(this.router.url)
    var a: string = this.router.url
    a = a.replace(/%3D/gi, '=')
    var b = a.substring(a.lastIndexOf('=') + 1);
    var c = a.substring(a.lastIndexOf('/') + 1);
    var s: any
    console.log(b)
    console.log(c)
    if(a == '/search/'+this.query  ){
      this.getbooks(this.query,1)
    }else{
      this.getbooks(this.query,this.config.currentPage)
    }
  }

  onPageChange(page: number) {
    this.Spinner.show()
    this.router.navigate(['search/' + this.query], { queryParams: { page: page } });
    this.getbooks(this.query, page)
    window.scrollTo(0, 200);
  }
  getbooks(query, page) {
    let res = this.search.searched(query, page);
    res.pipe(
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
    ).subscribe((resp) => {
      this.books = resp;
      console.log(resp)
      this.message = this.books.count;
      this.config.totalItems = this.books.totalBooks
      this.count = this.books.totalBooks
      this.Spinner.hide()

    })
  }
  jquery_code() { }

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
  // filters(modal: String,page) {
  //   this.filter.priceDefine(modal,page).subscribe((res) => {
  //     this.books = res;
  //   });
  // }
  // filtersSort(variant: String) {
  //   this.filter.sortBy(variant).subscribe((res) => {
  //     this.books = res;
  //   });
  // }

  // loadfilter() {
  //   if (this.router.url == '/books/sortBy100/200') {
  //     this.filters(this.first,1);
  //   }
  //   if (this.router.url == '/books/sortBy200/300') {
  //     this.filters(this.second,1);
  //   }
  //   if (this.router.url == '/books/sortBy300/400') {
  //     this.filters(this.third,1);
  //   }
  //   if (this.router.url == '/books/sortBy400/500') {
  //     this.filters(this.fourth,1);
  //   }
  //   if (this.router.url == '/books/sortBy500') {
  //     this.filters(this.fifth,1);
  //   }

  //   if (this.router.url == '/books/sortByasc') {
  //     this.filtersSort(this.variant1);
  //   }
  //   if (this.router.url == '/books/sortBydesc') {
  //     this.filtersSort(this.variant);
  //   }
  // }
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
