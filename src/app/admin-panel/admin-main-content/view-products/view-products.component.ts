import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from '@angular/forms';
import { Product } from "src/app/models/product.model"
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
declare var $: any;
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  @ViewChild('productform') productform: NgForm;
  booksearch: any = "";
  pid1: any = [];
  totalBooks: number;
  p: any
  product: Product
  @Output() totalbook1 = new EventEmitter<number>()
  pages: number = 1;
  book: any = [];
  book1: any;
  formbutton: boolean;
  button: boolean;
  book_img:any = [];
  div: boolean;
  constructor(
    private spinner: NgxSpinnerService,
    private newService: BooksService,
    private singelbook : SaveSingleBookService
  ) {
    this.product = new Product();
  }
  ngOnInit() {
    this.button = true
    this.div = false
    // this.spinner.show();
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

  edit(books) {
    this.book_img = books.book_img
    this.button = false
    this.formbutton = true
    this.div = true
    console.log(books)
    this.productform.setValue({
      bookname: books.book_name,
      authorname: books.author_name,
      isbn: books.Isbn_no,
      language: books.language,
      quantity: books.quantity,
      condition: books.condition,
      publisher: books.publisher,
      publicationyear: books.publication_year,
      print_type: books.print_type,
      dimension: books.dimensions,
      mrp: books.mrp,
      sale_price: books.sale_price,
      saved_price: books.saved_price,
      selling_price: books.selling_price,
      weight: books.weight,
      no_of_pages: books.no_Of_pages,
      discription: books.description,
      sku: books.sku

    })
  }

  selectfiles(event) {
    this.book_img.splice(0, this.book_img.length)
    // if (event.target.files.length > 0) {
    //   this.book_img = event.target.files;
    // }
    if(event.target.files){
      
      for (let i = 0; i <= File.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event : any) => {
          this.book_img.push(event.target.result)
        }
      }
    }
console.log(this.book_img)
  }
  submitbook() {
    if (this.productform.valid) {
      this.product.book_img = this.book_img
//       if (this.formbutton) {

// console.log('update')
//       } else {
// console.log("add")
//       }
console.log(this.product)
let resp = this.singelbook.savesinglebook(this.product)
resp.subscribe((data) => {
console.log(data)
})
    }
  }

  showbook() {
    window.scrollTo(0, 200);
    this.div = !this.div
    this.button = !this.button
    this.formbutton = false
    this.productform.resetForm();
  }
}
