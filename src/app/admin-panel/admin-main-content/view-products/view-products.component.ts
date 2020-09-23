import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from '@angular/forms';
import { Product } from "src/app/models/product.model"
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
import { JsonPipe } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  @ViewChild('productform') productform: NgForm;
  // @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  booksearch: any = "";
  pid1: any = [];
  totalBooks: number;
  p: any
  @Output() totalbook1 = new EventEmitter<number>()
  pages: number = 1;
  book: any = [];
  book1: any;
  formbutton: boolean;
  button: boolean;
  book_img: any = [];
  div: boolean;

  constructor(
    private spinner: NgxSpinnerService,
    private newService: BooksService,
    private singelbook: SaveSingleBookService,
    private toastr: ToastrService,
  ) {

  }
  ngOnInit() {
    this.spinner.show();
    this.button = true
    this.div = false
    // this.spinner.show();
    this.jquery_code();
    this.totalbook1.emit(this.totalBooks);

    this.singelbook.getbookload().subscribe(() => {
      this.loadbook();
    })
    this.loadbook();
  }
  jquery_code() {
    $(document).ready(function () {
    });
  }
  loadbook() {
    this.newService.getBooks(0).subscribe((data) => {
      this.spinner.hide();
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
    this.urls = books.book_img
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
  urls = []
  product = {
    book_img : [],
    book_name: "",
    author_name: "",
    Isbn_no: "",
    condition : "",
    description : "",
    dimensions : "",
    language : "",
    mrp : 0,
    no_Of_pages: 0,
    print_type : "",
    publication_year : "",
    publisher : "",
    quantity : 0,
    sale_price : 0,
    saved_price: 0,
    selling_price : 0,
    weight : 0,
    sku:"",
    categories : "5f3e5e840ea9ea23b901b5fd"
}

  selectfiles(event) {
    this.urls.splice(0, this.urls.length)


    if (event.target.files) {
      if (event.target.files.length > 0) {
        this.product.book_img = event.target.files;
       }
       console.log(this.product.book_img)

      for (let i = 0; i <= event.target.files ; i++) {

        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls.push(event.target.result)
        }
      }

    }



  }


  submitbook() {

    if (this.productform.valid) {
      const form = new FormData();
      for (const key in this.product) {
        if (this.product.hasOwnProperty(key)) {
          if (key === 'book_img') {
        for (let i = 0; i < this.product.book_img.length; i++) {
          form.append(
            'book_img',
            this.product.book_img[i],
            this.product.book_img[i].name
          );

        }
      }else{
        form.append(key, this.product[key]);
      }
    }
  }
      //       if (this.formbutton) {

      // console.log('update')
      //       } else {
      // console.log("add")
      //       }
      console.log(this.product)
      console.log(form)
      let resp = this.singelbook.savesinglebook(form)
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
  deletebook(id){
    this.spinner.show();
    this.singelbook.deletebook(id).subscribe((data)=>{
      console.log(data)
      this.toastr.error(data.message, 'BooksByWeight', {
        timeOut: 1000,
      });

    })
  }
}
