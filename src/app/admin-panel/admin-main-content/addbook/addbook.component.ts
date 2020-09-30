import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { Product } from 'src/app/models/product.model';
import { AdminLoginService } from 'src/app/services/admin-login.service';
import { CategoryService } from 'src/app/services/category.service';
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
  constructor(
    private toggle: AdminLoginService,
    private cat: CategoryService,
    private modalService: ModalManager
  ) {
    this.product = new Product()
    this.toggle.opensidebar.subscribe((toggle) => {
      this.opened = toggle
    })
  }

  ngOnInit() {
    this.loadcat()
    this.loadsubcat()
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
console.log(this.product.categories)
  }
  selectsubcat(catname,subcatname,catid,subcatid){
    this.catname = catname
    this.subcatname = subcatname
    this.product.categories = catid
    this.product.subcategory = subcatid
    this.closeModal()
    console.log(this.product.categories,this.product.subcategory)
  }
  openModal(){

    this.modalRef = this.modalService.open(this.myModal, {
      "title": "Your Custom Modal",
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
      console.log(this.allcategories)
    })

  }

  loadsubcat() {

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
  mrp_dollar,mpr_euro,mrp_aus_dollar,mrp_pound,
  Goc_dollar,Goc_euro,Goc_Aus_dollar,Goc_pound,
  rate,weight,final_price,sale_price,sale_rate,
  discount_rs,discount_per,sale_disc_inr,sale_disc_per
  ){
    // this.product.mrp_dollar  = mrp_dollar
    // this.product.mrp_euro  = mpr_euro
    // this.product.mrp_aus_dollar  = mrp_aus_dollar
    // this.product.mrp_pound  = mrp_pound
    // this.product.rate = rate
    // this.product.weight = weight
    // this.product.final_price = final_price
    // this.product.sale_price = sale_price
    // this.product.sale_rate = sale_rate
    // this.product.discount_rs = discount_rs
    // this.product.discount_per = discount_per
    // this.product.sale_disc_inr = sale_disc_inr
    // this.product.sale_disc_per = sale_disc_per

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

  // selectfiles(event) {
  //   this.urls.splice(0, this.urls.length)


  //   if (event.target.files) {
  //     if (event.target.files.length > 0) {
  //       this.product.book_img = event.target.files;
  //     }
  //     console.log(this.product.book_img)

  //     for (let i = 0; i <= event.target.files; i++) {

  //       var reader = new FileReader();
  //       reader.readAsDataURL(event.target.files[i]);
  //       reader.onload = (event: any) => {
  //         this.urls.push(event.target.result)
  //       }
  //     }

  //   }



  // }

}
