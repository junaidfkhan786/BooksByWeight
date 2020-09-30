import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { AdminLoginService } from 'src/app/services/admin-login.service';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  @ViewChild('myModal') myModal;
  pages:number
  product:Product
  query: any
  opened:boolean
  allcategories:any
  catname:string
  subcatname:string
  show:boolean = false
  i:number
  private modalRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookdetail: BooksService,
    private toggle:AdminLoginService,
    private cat :CategoryService,
    private modalService: ModalManager,
    private singelbook: SaveSingleBookService,
  ) {
    this.product = new Product()
    this.toggle.opensidebar.subscribe((toggle)=>{
      this.opened = toggle
     })
  }

  ngOnInit(): void {
    this.loadroute()
    this.loadcat()
  }

  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 0);
  }

  selectcat(name,catid){
    this.catname = name
    this.product.categories = catid
    this.closeModal()

  }
  selectsubcat(catname,subcatname,catid,subcatid){
    this.catname = catname
    this.subcatname = subcatname
    this.product.categories = catid
    this.product.subcategory = subcatid
    this.closeModal()

  }
  openModal(){

    this.modalRef = this.modalService.open(this.myModal, {
      "title": "Cat & SubCat Selection",
      "size": "lg",
      "modalClass": "",
      "hideCloseButton": false,
      "centered": true,
      "backdrop": true,
      "animation": true,
      "keyboard": true,
      "closeOnOutsideClick": true,
      "backdropClass": "modal-backdrop"
    })
}
closeModal(){
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
}
  loadcat() {

    this.cat.getCategory().subscribe((categories) => {
      this.allcategories = categories

    })

  }
  book_img1:any
  book_img2:any
  book_img3:any
  book_img4:any
  loadroute() {
    this.query = this.route.snapshot.params._id
    this.bookdetail.getDetailPackage(this.query).pipe(
      map((data)=>{

        data.books[0]['mrp_inr'] = Math.floor(data.books[0]['mrp_inr'])
        data.books[0]['rate'] = Math.floor(data.books[0]['rate'])
        data.books[0]['weight'] = Math.floor(data.books[0]['weight'])
        data.books[0]['sale_disc_inr'] = Math.floor(data.books[0]['sale_disc_inr'])
        data.books[0]['sale_disc_per'] = Math.floor(data.books[0]['sale_disc_per'])
        data.books[0]['discount_per'] = Math.floor(data.books[0]['discount_per'])
        data.books[0]['discount_rs'] = Math.floor(data.books[0]['discount_rs'])
        data.books[0]['final_price'] = Math.floor(data.books[0]['final_price'])
        data.books[0]['sale_rate'] = Math.floor(data.books[0]['sale_rate'])
        data.books[0]['sale_price'] = Math.floor(data.books[0]['sale_price'])
        return data
      })
    ).subscribe((result)=>{
      console.log(result)

      var book = result.books[0];
      this.product.book_img = book.book_img
      this.book_img1 = book.book_img[0]
      this.book_img2 = book.book_img[1]
      this.book_img3 = book.book_img[2]
      this.book_img4 = book.book_img[3]
      this.product._id = book._id
      this.product.active_bool = book.active_bool
      this.product.book_name = book.book_name
      this.product.author_name = book.author_name
      this.product.Isbn_no = book.Isbn_no
      this.product.condition = book.condition
      this.product.description = book.description
      this.product.dimensions = book.dimensions
      this.product.language = book.language
      this.product.mrp_inr = book.mrp_inr
      this.product.mrp_dollar = book.mrp_dollar
      this.product.mrp_euro = book.mrp_euro
      this.product.mrp_aus_dollar = book.mrp_aus_doller
      this.product.mrp_pound = book.mrp_pound
      this.product.no_Of_pages = book.no_Of_pages
      this.product.print_format = book.print_format
      this.product.publication_year = book.publication_year
      this.product.publisher = book.publisher
      this.product.quantity = book.quantity
      this.product.sale_price = book.sale_price
      this.product.final_price = book.final_price
      this.product.sale_rate = book.sale_rate
      this.product.discount_per = book.discount_per
      this.product.discount_rs = book.discount_rs
      this.product.sale_disc_per = book.sale_disc_per
      this.product.sale_disc_inr = book.sale_disc_inr
      this.product.weight = book.weight
      this.product.rate = book.rate
      this.product.sku = book.sku
      this.product.categories = book.categories
      this.product.subcategory = book.subcategory
    })
    console.log()

  }
  calculate(
    mrp_dollar:number,mpr_euro:number,mrp_aus_dollar:number,mrp_pound:number,
    Goc_dollar:number,Goc_euro:number,Goc_aus_dollar:number,Goc_pound:number,
    rate:number,weight:number,final_price:number,sale_price:number,sale_rate:number,
    discount_rs:number,discount_per:number,sale_disc_inr:number,sale_disc_per:number,
    no_Of_pages,quantity:number
    ){


      this.product.no_Of_pages = no_Of_pages
      this.product.quantity = Number(quantity)
      this.product.mrp_dollar  = Number(mrp_dollar)
      this.product.mrp_euro  = Number(mpr_euro)
      this.product.mrp_aus_dollar  = Number(mrp_aus_dollar)
      this.product.mrp_pound  = Number(mrp_pound)
      this.product.rate = Math.floor(rate)
      this.product.weight = Math.floor(weight)
      this.product.sale_rate = Math.floor(sale_rate)

      this.product.final_price = Math.floor(this.product.rate * this.product.weight / 1000)
      if(this.product.mrp_dollar != 0 && Math.floor(Goc_dollar)!=null && Math.floor(Goc_dollar)!=0 ){
        this.product.mrp_inr = this.product.mrp_dollar * Math.floor(Goc_dollar)
        this.product.mrp_euro = 0
        this.product.mrp_aus_dollar = 0
        this.product.mrp_pound = 0
      }else if(this.product.mrp_euro != 0 && Math.floor(Goc_euro)!=null && Math.floor(Goc_euro)!=0 ){
        this.product.mrp_inr = Number(this.product.mrp_euro) * Math.floor(Goc_euro)
        this.product.mrp_dollar = 0
        this.product.mrp_aus_dollar = 0
        this.product.mrp_pound = 0
      }else if(this.product.mrp_aus_dollar != 0 && Math.floor(Goc_aus_dollar)!=null && Math.floor(Goc_aus_dollar)!=0 ){
        this.product.mrp_inr = this.product.mrp_aus_dollar * Math.floor(Goc_aus_dollar)
        this.product.mrp_dollar = 0
        this.product.mrp_euro = 0
        this.product.mrp_pound = 0
      }else if(this.product.mrp_pound != 0 && Math.floor(Goc_pound)!=null && Math.floor(Goc_pound)!=0 ){
        this.product.mrp_inr = this.product.mrp_pound * Math.floor(Goc_pound)
        this.product.mrp_dollar = 0
        this.product.mrp_euro = 0
        this.product.mrp_aus_dollar = 0
      }else{
        this.product.mrp_inr = Math.floor(this.product.final_price)
        this.product.mrp_dollar = 0
        this.product.mrp_euro = 0
        this.product.mrp_aus_dollar = 0
        this.product.mrp_pound = 0
      }

      this.product.discount_rs = Math.floor(this.product.mrp_inr) - Math.floor(this.product.final_price)
      this.product.discount_per = Number(Math.floor(this.product.discount_rs) / Math.floor(this.product.mrp_inr) * 100)
      if(this.product.sale_rate != 0 && this.product.sale_rate != null){
        this.product.sale_price = Math.floor(sale_rate) * Math.floor(this.product.weight) / 1000
        this.product.sale_disc_inr = Math.floor(this.product.mrp_inr) - Math.floor(this.product.sale_price)
        this.product.sale_disc_per = Number(Math.floor(this.product.sale_disc_inr) / Math.floor(this.product.mrp_inr) * 100)
      }
      this.show = true


  console.log(this.product)
  }
  submitbook(
    no_Of_pages,quantity:number,book_img_1,book_img_2,book_img_3,book_img_4
  ){
    var img:any = [
      book_img_1,
      book_img_2,
      book_img_3,
      book_img_4
    ]
    this.product.book_img = img
    this.product.no_Of_pages = no_Of_pages
    this.product.quantity = Number(quantity)
    console.log(this.product)


    let resp = this.singelbook.editbook(this.query,this.product)
    resp.subscribe((data) => {
      Swal.fire({
        title: 'Your Book Has Been Edited Successfully?',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Done'
      }).then((result) => {
        if (result.value) {
          window.location.assign('/admin/dashboard/view-products')
          // this.ngZone.run(() => this.router.navigate(['/books'])).then();
        }
      })
    },(error)=>{
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill All Feild Properly',
      })
    })
  }



}
