import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UrlTree, DefaultUrlSerializer, ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AdminLoginService } from 'src/app/services/admin-login.service';
import { BooksService } from 'src/app/services/books.service';
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
import { SearchService } from 'src/app/services/search.service';
declare var $: any;
@Component({
  selector: 'app-booksearch',
  templateUrl: './booksearch.component.html',
  styleUrls: ['./booksearch.component.css']
})
export class BooksearchComponent implements OnInit {

  booksearch: any = "";
  pid1: any = [];
  totalBooks: number;
  p: any
  @Output() totalbook1 = new EventEmitter<number>()
  book: any = [null];
  book1: any;
  book$:any =[null]
  formbutton: boolean;
  button: boolean;
  book_img: any = [];
  div: boolean;
  opened: boolean
  config: any
  selector: any = [];
  selected: any;
  Searchinput: any;
  query:string
  count:any
  message:any
  constructor(
    private spinner: NgxSpinnerService,
    private newService: BooksService,
    private singelbook: SaveSingleBookService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private toggle: AdminLoginService,
    private searchs:SearchService
  ) {
    this.toggle.opensidebar.subscribe((toggle) => {
      this.opened = toggle
    })
    this.config = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: ''
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);
   }

  ngOnInit(): void {
    this.selection()
    this.route.params.subscribe(routeParams => {
      this.loadroute()
    });
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
    if(a == '/admin/dashboard/booksearch/'+this.query  ){
      this.getbooks(this.query,1)
    }else{
      this.getbooks(this.query,this.config.currentPage)
    }
  }

  search(selected, Searchinput) {

    var _id = Searchinput + "&" + selected
    console.log(_id)
    this.router.navigate(['admin/dashboard/booksearch/'+_id]);
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
  jquery_code() {
    $(document).ready(function () {
    });
  }
  getbooks(query, page) {
    let res = this.searchs.searched(query, page);
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
    ).subscribe((data) => {
      this.spinner.hide();
      this.book = data.books
      console.log(data)
      this.book1 = data.totalBooks
      this.config.totalItems = data.totalBooks;
      this.totalbook1.emit(this.totalBooks)
    })
  }
  onPageChange(page: number) {
    this.spinner.show()
    this.router.navigate(['admin/dashboard/booksearch/' + this.query], { queryParams: { page: page } });
    this.getbooks(this.query, page)
    window.scrollTo(0, 200);
  }
edit(books){
  var id = books._id
  this.router.navigate(['admin/dashboard/editbook/'+id])
}




  deletebook(id) {
    this.spinner.show();
    this.singelbook.deletebook(id).subscribe((data) => {
      console.log(data)
      this.toastr.error(data.message, 'BooksByWeight', {
        timeOut: 1000,
      });

    })
  }
}
