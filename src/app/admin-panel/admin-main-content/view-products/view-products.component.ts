import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { NgxSpinnerService } from "ngx-spinner";
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

  pages: number = 1;
  book: any = [];
  book1: any;
  constructor(
    private spinner: NgxSpinnerService,
    private newService: BooksService,

  ) { }

  ngOnInit() {
    this.spinner.show();
    this.jquery_code();

    this.totalbook1.emit(this.totalBooks)

    this.loadbook();




  }
  jquery_code() {
    $(document).ready(function () {

    });
  }

  loadbook() {


    this.newService.getBooks().subscribe((data) => {

      this.book = data.books
      const pid = data.books;

      this.book1 = pid.length
      for (var { _id: id } of pid) {
        this.pid1.push(id);
      }


      this.totalBooks = data.books.length;

      this.pages = 1;



      this.totalbook1.emit(this.totalBooks)
      this.spinner.hide();
    });
  }

  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
  }


}
