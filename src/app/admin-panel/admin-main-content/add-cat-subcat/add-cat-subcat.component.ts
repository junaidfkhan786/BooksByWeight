import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any
@Component({
  selector: 'app-add-cat-subcat',
  templateUrl: './add-cat-subcat.component.html',
  styleUrls: ['./add-cat-subcat.component.css']
})
export class AddCatSubcatComponent implements OnInit {
  subcat: boolean = false
  div: boolean;
  categories: boolean = true
  pages: number = 1
  cat: any = []
sub:any =[]
  catdata = {
    category: "",
    subcategory: []
  }
  selected: any;

  constructor(
    private allcat: CategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {


  }

  ngOnInit() {

    this.jquery_code()
    this.div = true
    // this.spinner.show();
    this.allcat.getcategoryload().subscribe(()=>{
      this.getallsub();
      this.getallcat();
    })
    this.getallsub();
    this.getallcat();
  }

  jquery_code() {
    $(document).ready(function () {
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
    })
  }

  addcat(catvalue) {
    this.catdata.category = catvalue
    this.catdata.subcategory.push(this.selected)
  }

  subcats ={
name:""
  } 
  addsubcat(subs) {
 this.subcats.name = subs
 
    this.allcat.postsubcategory(this.subcats).subscribe((data)=>{
      if(data.message){
        this.toastr.success(subs + ' ' + "Was Created", 'BooksByWeight', {
          timeOut: 2000,
        });
      }else{
        this.toastr.error("Somthing Went Wrong Contact Developer", 'BooksByWeight', {
          timeOut: 2000,
        });
      }
  

    })

    $(this).closest('form').find("input[type=text], textarea").val("");
    $('.subcat').val(null)
  }

  submitcat() {

    let alldata: any = this.catdata
    console.log(alldata)
    this.allcat.postcategory(alldata).subscribe(
      (response) => {
        if(response.message){
          this.toastr.success(response.message, 'BooksByWeight', {
            timeOut: 2000,
          });
        }else{
          this.toastr.error("Somthing Went Wrong Contact Developer", 'BooksByWeight', {
            timeOut: 2000,
          });
        }
    $(this).closest('form').find("input[type=text], textarea").val("");
    $('.subcat').val(null)
    this.div = true
       
      }, (error) => console.log(error),
      () => console.log("Categories And SubCategories Send To Server SuccessFull")
    )
  }
  getallcat() {
    this.allcat.getCategory().subscribe(
      (cat) => {
        this.spinner.hide();
        this.cat = cat
      }, (error) => {
        console.log(error)
      }, () => console.log(" All Categories Fetched Successfully ")
    )
  }
selname :any
  getallsub(){
    this.allcat.getallsub().subscribe(
      (sub) => {
        this.spinner.hide();
        this.sub = sub
        this.selected = this.sub[0]._id
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
    this.div = !this.div
  }

}
