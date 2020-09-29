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
console.log(this.route.snapshot.params._id )
if(this.route.snapshot.params._id != undefined){
  this.query = this.route.snapshot.params._id
  console.log(this.router.url)
  var a: string = this.router.url
  a = a.replace(/%3D/gi, '=')
  var b = a.substring(a.lastIndexOf('=') + 1);
  var c = a.substring(a.lastIndexOf('/') + 1);
  var s: any
  console.log(b)
  console.log(c)
  if(a == '/admin/dashboard/view-products/'+this.query  ){
    console.log('get search books')
    this.getbooks(this.query,1)
  }else{
    console.log('get search books with page')
    this.getbooks(this.query,this.config.currentPage)
  }
}
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

    }else{
      console.log('loading search books')
      this.loadroute()
    }
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
    ).subscribe((resp) => {
      this.book$ = resp.books
      console.log(this.book$)
      this.message = this.book$.count;
      this.config.totalItems = resp.totalBooks;
      this.count = this.book$.totalBooks

    })
  }
  search(selected, Searchinput) {

    var _id = Searchinput + "&" + selected
    console.log(_id)
    this.router.navigate(['admin/dashboard/view-products/'+_id]);
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
      const pid = data.books;
      this.book1 = pid.length
      for (var { _id: id } of pid) {
        this.pid1.push(id);
      }
      this.config.totalItems = data.totalBooks;
      this.totalbook1.emit(this.totalBooks)
      this.spinner.hide();
    });
  }
  onPageChange(page: number) {
    if (this.router.url == '/admin/dashboard/view-products' || this.router.url == '/admin/dashboard/view-products?page=' + this.config.currentPage) {
      this.router.navigate(['admin/dashboard/view-products/'], { queryParams: { page: page } });
      this.loadbook(page)
    }else{
      this.router.navigate(['admin/dashboard/view-products/' + this.query], { queryParams: { page: page } });
    this.getbooks(this.query, page)
    }
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
    book_img: [],
    book_name: "",
    author_name: "",
    Isbn_no: "",
    condition: "",
    description: "",
    dimensions: "",
    language: "",
    mrp: 0,
    no_Of_pages: 0,
    print_type: "",
    publication_year: "",
    publisher: "",
    quantity: 0,
    sale_price: 0,
    saved_price: 0,
    selling_price: 0,
    weight: 0,
    sku: "",
    categories: "5f3e5e840ea9ea23b901b5fd"
  }

  selectfiles(event) {
    this.urls.splice(0, this.urls.length)


    if (event.target.files) {
      if (event.target.files.length > 0) {
        this.product.book_img = event.target.files;
      }
      console.log(this.product.book_img)

      for (let i = 0; i <= event.target.files; i++) {

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
          } else {
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
    window.scrollTo(0, 0);
    this.div = !this.div
    this.button = !this.button
    this.formbutton = false
    this.productform.resetForm();
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
