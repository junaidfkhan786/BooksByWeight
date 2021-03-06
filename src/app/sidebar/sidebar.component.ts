import { CategoryService } from './../services/category.service';
import { Category } from './../models/categories.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from './../services/filter.service';
import { ProductsComponent } from '../products/products.component';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
category:any
  public product: ProductsComponent;
  category$: any;
  constructor(private newService: CategoryService, private router: Router, private filter: FilterService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
this.spinner.show()
    this.newService.getCategory().pipe(
      map((data)=>{
        var cat:any = []
        cat = data
        for (let i = 0; i < cat.length; i++) {
        if(cat[i].icon){
          cat[i]['icon_name'] = cat[i]['icon']
          delete cat[i]['icon']
        }
        }
        return data
      } )
    )
      .subscribe((data) =>{
        this.spinner.hide();
        this.category$ = data
        this.category = this.category$;

      }
      );



    this.jquery_code();
  }

  jquery_code() {
    $(document).ready(function () {

      // $(".dropright, .btn-group").click(function(){

      //     var dropdownMenu = $(this).children(".dropdown-menu");

      //     if(dropdownMenu.is(":visible")){

      //         dropdownMenu.parent().toggleClass("open");

      //     }

      // });


    });
  }
  public price0() {

    this.router.navigate(['books/sortBy0/100'])
  }
  public price() {

    this.router.navigate(['books/sortBy100/200'])
  }
  public price1() {

    this.router.navigate(['books/sortBy200/300'])
  }
  public price2() {

    this.router.navigate(['books/sortBy300/400'])
  }
  public price3() {

    this.router.navigate(['books/sortBy400/500'])
  }
  public price4() {

    this.router.navigate(['books/sortBy500'])
  }
  public lowTohigh() {
    this.router.navigate(['books/sortByasc'])
  }
  public highTolow() {
    this.router.navigate(['books/sortBydesc'])
  }
  public productCat(_id) {
    this.router.navigate(['categories/' + _id])
  }

  public productSubCat(_id) {
    this.router.navigate(['subcategory/' + _id])
  }
}
