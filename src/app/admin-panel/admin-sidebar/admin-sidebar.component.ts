import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
 

  constructor(public router : Router) { }

@Input() openedside : boolean;

  ngOnInit() {

    this.jquery_code();
  }

  jquery_code(){

    $(document).ready(function () {
      $( ".arrow" ).click(function() {
        //alert($( this ).css( "transform" ));
        if (  $( this ).css( "transform" ) == 'none' ){
            $(this).css("transform","rotate(90deg)");
        } else {
            $(this).css("transform","" );
        }
    });

 
 
    });

  }

  viewproducts(){
    this.router.navigate(['admin/dashboard/view-products']);
  }
  viewusers(){
    this.router.navigate(['admin/dashboard/view-users']);
  }
  addbulkproducts(){
    this.router.navigate(['admin/dashboard/add-bulk-products']);
  }
  vieworders(){
    this.router.navigate(['admin/dashboard/view-orders']);
  }
}
