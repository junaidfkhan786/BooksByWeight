import { NgForm } from '@angular/forms';
import { Component, OnInit, ErrorHandler, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare var $: any
@Component({
  selector: 'app-add-cat-subcat',
  templateUrl: './add-cat-subcat.component.html',
  styleUrls: ['./add-cat-subcat.component.css']
})
export class AddCatSubcatComponent implements OnInit {
  categoriessearch: any = "";
  subcat: boolean = false
  div: boolean;
  categories: boolean = true
  pages: number = 1
  cat: any = []
  sub: any = []
  btnsubadd:boolean= true
  catdata = {
    category: "",
    icon_name:"",
    subcategory: []
  }
  selected: any;
  message: any
  constructor(
    private allcat: CategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {


  }

  ngOnInit() {
    this.btnsubadd = false
    this.catdata.icon_name = null
    this.selected = null
    this.spinner.show();
    this.buttondisabled();
    this.jquery_code()
    this.div = true
    // this.spinner.show();
    this.allcat.getcategoryload().subscribe(() => {
      this.getallsub();
      this.getallcat();
    })
    this.getallsub();
    this.getallcat();
  }

  jquery_code() {
    $(document).ready(function () {

    })
  }
showsub(){
  this.btnsubadd = !this.btnsubadd
}
submitsub(catids,value){
if(value != ""){
this.spinner.show();
  console.log(value)
  this.subcats.name = value
  this.allcat.postsubcategory(this.subcats).subscribe((data)=>{
    var subid = data.category._id
    var catid = catids
    this.allcat.subcattocat(catid,subid).subscribe((data)=>{
      console.log(data)
      this.spinner.hide()
      this.btnsubadd = !this.btnsubadd
      this.toastr.success("SubCategory Added To Category Successfuly", 'BooksByWeight', {
        timeOut: 2000,
      });
    })
    

  })
}else{
  this.toastr.error("Please Fill All Details Correctly", 'BooksByWeight', {
    timeOut: 2000,
  });
}
}

delsubcattocat(catids,value){
  this.spinner.show();
  console.log(catids,value)
  this.allcat.subcattocatdel(catids,value).subscribe((data)=>{
    console.log(data)
    this.spinner.hide()
    this.toastr.success("SubCategory Deleted From Category Successfuly", 'BooksByWeight', {
      timeOut: 2000,
    });
  })
}
  buttondisabled(){
    $('.sub').attr('disabled', true);
    $('.subcat').keyup(function () {
      if ($(this).val().length != 0)
        $('.sub').attr('disabled', false);
      else
        $('.sub').attr('disabled', true);
    })
    $('.subcat').click(function () {
      if ($(this).val().length != 0)
        $('.sub').attr('disabled', false);
      else
        $('.sub').attr('disabled', true);
    })
  }
  clear() {
    this.selected = null;
    this.catdata.category = null
    this.catdata.icon_name = null
    this.catdata.subcategory.splice(0, this.catdata.subcategory.length)
    $(this).closest('form').find("input[type=text], textarea").val("");
    $('.subcat').val(null)
  }

  addcat(catvalue,iconvalue) {
    this.catdata.category = catvalue
    this.catdata.icon_name  = iconvalue
    if (this.catdata.subcategory.includes(this.selected)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This SubCategory Is Already Added Please Choose Different!',
      })

    } else {
      if (this.selected != null) {
        this.catdata.subcategory.push(this.selected)
      }

    }

  }

  subcats = {
    name: ""
  }
  s: boolean = false
  addsubcat(subs) {
    this.selected = null
    this.subcats.name = subs
    for (let i = 0; i < this.sub.length; i++) {
      if (this.sub[i].name == this.subcats.name) {
        console.log(this.sub[i].name)
        this.s = false
        break
      } else {
        this.s = false
      }
    }

    if (this.s == true) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This SubCategory Is Already Added Please Choose Different!',
      })
    } else if (this.subcats.name == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please First Hit Add Then Hit Submit !',
      })
      this.selected = null
      $(this).closest('form').find("input[type=text], textarea").val("");
      $('.subcat').val(null)
      this.buttondisabled()
    } else {
     
      $(this).closest('form').find("input[type=text], textarea").val("");
      $('.subcat').val(null)
      this.allcat.postsubcategory(this.subcats).subscribe((data) => {
        if (data.message) {
          this.spinner.hide();
          this.subcats.name = null
          this.selected = null
          this.toastr.success(subs + ' ' + "Was Created", 'BooksByWeight', {
            timeOut: 2000,
          });
          $(this).closest('form').find("input[type=text], textarea").val("");
          $('.subcat').val(null)
          $('.sub').attr('disabled', true);
          this.buttondisabled()
        } else {
          this.spinner.hide();
          this.toastr.error("Somthing Went Wrong Contact Developer", 'BooksByWeight', {
            timeOut: 2000,
          });
        }


      })
    }
  }
  m: boolean = false
  submitcat() {
    for (let i = 0; i < this.cat.length; i++) {
      if (this.cat[i].category == this.catdata.category) {
        console.log(this.cat[i].category)
        this.catdata.category == null
        this.m = true;
        break;
      } else {
        this.m = false
      }

    }
    if (this.m == true) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This Category Is Already Added Please Choose Different!',
      })
      this.catdata.category= null
      this.catdata.subcategory.splice(0,this.catdata.subcategory.length)
    } else if (this.catdata.category == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please First Hit Add Then Hit Submit !',
      })
      this.selected = null
      $(this).closest('form').find("input[type=text], textarea").val("");
      $('.subcat').val(null)
      this.buttondisabled()
    }
    else {
      this.m = false
      this.spinner.show()
      let alldata: any = this.catdata
      console.log(alldata)
  if(this.catdata.category !== null){
    this.allcat.postcategory(alldata).subscribe(
      (response) => {
        if (response.message) {
          this.catdata.icon_name = null
          this.selected = null
          this.spinner.hide();
          this.toastr.success(response.message, 'BooksByWeight', {
            timeOut: 2000,
          });
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);

        } else {
          this.spinner.hide();
          this.toastr.error("Somthing Went Wrong Contact Developer", 'BooksByWeight', {
            timeOut: 2000,
          });
        }
        $(this).closest('form').find("input[type=text], textarea").val("");
        $('.subcat').val(null)
        this.buttondisabled()
        this.catdata.category = null
        this.catdata.subcategory.splice(0, this.catdata.subcategory.length)
        $(this).closest('form').find("input[type=text], textarea").val("");
        $('.subcat').val(null)
        this.div = true

      }, (error) => {

        if (error) {
          this.spinner.hide()
          this.toastr.error("Please Fill All Details Correctly", 'BooksByWeight', {
            timeOut: 2000,
          });
        }

      },
      () => console.log("Categories And SubCategories Send To Server SuccessFull")
    )
  }
    }



  }
  getallcat() {
    this.allcat.getCategory().subscribe(
      (cat) => {
        this.spinner.hide();
        this.cat = cat
        this.selected = null
      }, (error) => {
        console.log(error)
      }, () => console.log(" All Categories Fetched Successfully ")
    )
  }
  selname: any
  getallsub() {
    this.allcat.getallsub().subscribe(
      (sub) => {
        this.spinner.hide();
        this.sub = sub
        this.selected = null
      }, (error) => {
        console.log(error)
      }, () => console.log(" All SubCategories Fetched Successfully ")
    )
  }

  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
  }

  addcategory() {
    this.selected = null
    this.div = !this.div
  }

}
