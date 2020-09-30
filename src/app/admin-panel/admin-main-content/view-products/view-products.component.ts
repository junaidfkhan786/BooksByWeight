import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from '@angular/forms';
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, DefaultUrlSerializer, Router, UrlTree } from '@angular/router';
import { AdminLoginService } from 'src/app/services/admin-login.service';
import { map } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
declare var $: any;
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

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
  ngOnInit() {
    this.spinner.show();
    this.button = true
    this.div = false
    // this.spinner.show();
    this.jquery_code();
    this.totalbook1.emit(this.totalBooks);
    this.selection()
    this.singelbook.getbookload().subscribe(() => {
      this.load()
    })
    this.load()
  }


  load() {
    if (this.router.url == '/admin/dashboard/view-products' ||
      this.router.url == '/admin/dashboard/view-products?page=' + this.config.currentPage) {
      if (this.router.url == '/admin/dashboard/view-products') {
        console.log('loading all books')
        this.loadbook(1);
      } else {
        this.loadbook(this.config.currentPage);
      }

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
  loadbook(page) {
    this.newService.getBooks(page).subscribe((data) => {
      this.spinner.hide();
      this.book = data.books
      console.log(data)
      this.book1 = data.totalBooks
      this.config.totalItems = data.totalBooks;
      this.totalbook1.emit(this.totalBooks)
      this.spinner.hide();
    });
  }
  onPageChange(page: number) {
    if (this.router.url == '/admin/dashboard/view-products' || this.router.url == '/admin/dashboard/view-products?page=' + this.config.currentPage) {
      this.router.navigate(['admin/dashboard/view-products/'], { queryParams: { page: page } });
      this.loadbook(page)
    }
    window.scrollTo(0, 60);
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
