import { Component, OnInit, ViewChild } from '@angular/core';
import { FLOAT, float } from 'html2canvas/dist/types/css/property-descriptors/float';
import { ModalManager } from 'ngb-modal';
import { Product } from 'src/app/models/product.model';
import { AdminLoginService } from 'src/app/services/admin-login.service';
import { CategoryService } from 'src/app/services/category.service';
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  @ViewChild('myModal') myModal;
  private modalRef;
  opened: boolean
  product: Product
  urls: any = []
  allcategories:any
  catname:string
  subcatname:string
  show:boolean = false
  i:number
  constructor(
    private toggle: AdminLoginService,
    private cat: CategoryService,
    private modalService: ModalManager,
    private singelbook: SaveSingleBookService,
  ) {
    this.product = new Product()
    this.toggle.opensidebar.subscribe((toggle) => {
      this.opened = toggle
    })
  }

  ngOnInit() {
    this.loadcat()

  }
  pages
  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
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


  onFileChange(event) {
    try {
      if (!this.validateFile(event.target.files[0].name)) {
        throw { type: "please upload Image file" };
      } else if (event.target.files.length > 4) {
        throw { multiple: "Cannot use More Than 4 files" };
      } else {
        this.urls.splice(0, this.urls.length)
        if (event.target.files && event.target.files[0]) {

          var filesAmount = event.target.files.length;
          this.product.book_img = event.target.files;
          console.log(this.product.book_img)
          for (let i = 0; i < filesAmount; i++) {

            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.urls.push(event.target.result);
            }
            reader.readAsDataURL(event.target.files[i]);

          }

        }
      }
    } catch (error) {
      if (error.type) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.type,
        })
      } else if (error.multiple) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.multiple,
        })
      }
    }



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
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg') {
      return true;
    } else if (ext.toLowerCase() == 'jpeg') {
      return true;
    } else if (ext.toLowerCase() == 'png') {
      return true;
    }
    else {
      return false;
    }
  }

  submitbook(
    no_Of_pages,quantity:number
  ){
    this.product.no_Of_pages = no_Of_pages
    this.product.quantity = Number(quantity)
    console.log(this.product)
    const form = new FormData();
    for (const key in this.product) {
      if (this.product.hasOwnProperty(key)) {
        if (key === 'book_img') {
      for (let i = 0; i < this.product.book_img.length; i++) {
        form.append(
          'book_img',
          this.product.book_img[i],
        );

      }
    }else{
      form.append(key, this.product[key]);
    }
  }
}

    console.log(this.product)
    console.log(form)
    let resp = this.singelbook.savesinglebook(form)
    resp.subscribe((data) => {
      Swal.fire({
        title: 'Your Book Has Been Created Successfully?',
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill All Feild Properly',
      })
    })
  }

}
