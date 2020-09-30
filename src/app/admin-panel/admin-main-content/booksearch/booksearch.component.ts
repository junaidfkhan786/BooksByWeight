import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UrlTree, DefaultUrlSerializer, ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminLoginService } from 'src/app/services/admin-login.service';
import { BooksService } from 'src/app/services/books.service';
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-booksearch',
  templateUrl: './booksearch.component.html',
  styleUrls: ['./booksearch.component.css']
})
export class BooksearchComponent implements OnInit {
  @ViewChild('productform') productform: NgForm;
  // @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
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
}
