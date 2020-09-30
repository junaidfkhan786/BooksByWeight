import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, DefaultUrlSerializer, Router, UrlTree } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AdminLoginService } from 'src/app/services/admin-login.service';
declare var $: any;
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  role: string

  constructor(
    public router: Router,
    public route:ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.getadmin();
    this.jquery_code();
  }

  jquery_code() {

    $(document).ready(function () {
      $(".arrow").click(function () {
        //alert($( this ).css( "transform" ));
        if ($(this).css("transform") == 'none') {
          $(this).css("transform", "rotate(90deg)");
        } else {
          $(this).css("transform", "");
        }
      });



    });

  }

  viewproducts() {
    this.router.navigate(['admin/dashboard/view-products']);
  }
  viewusers() {
    this.router.navigate(['admin/dashboard/view-users']);
  }
  addbulkproducts() {
    this.router.navigate(['admin/dashboard/add-bulk-products']);
  }
  vieworders() {
    this.router.navigate(['admin/dashboard/view-orders']);
  }
  ViewCatSubcat() {
    this.router.navigate(['admin/dashboard/View-Cat-&&-SubCat']);
  }
  Coupon() {
    this.router.navigate(['admin/dashboard/Coupon']);
  }
  admin() {
    this.router.navigate(['admin/dashboard/Admin']);
  }
  addbook() {
    this.router.navigate(['admin/dashboard/addbook']);
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
query:any
  getadmin() {
    if (localStorage.getItem('SuperAdmin')) {
      this.query = this.route.snapshot.params._id
      var r: string = this.router.url
      r = r.replace(/%3D/gi, '=')
      var c = r.substring(r.lastIndexOf('/') + 1);
      console.log(c)
      var token = localStorage.getItem('SuperAdmin');
      var decode = jwt_decode(token);
      this.role = decode.role
      var a = window.location.href
      var b = a.substring(a.lastIndexOf('=')+1)
      console.log(b)
      if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/view-orders" ||
      this.router.url === "/admin/dashboard/view-orders?page="+b
      ) {

      }
      else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/view-users" ||
      this.router.url === "/admin/dashboard/view-users?page="+b) {

      }
      else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/Admin") {

      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/Coupon") {

      }
      else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/View-Cat-&&-SubCat") {

      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/add-bulk-products") {

      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/addbook") {

      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/editbook/"+this.query) {

      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/view-products"||
      this.router.url === "/admin/dashboard/view-products?page="+b
      ) {

      } else if (this.role === "SuperAdmin" &&
      r === "/admin/dashboard/booksearch/"+c||
      r === "/admin/dashboard/booksearch/"+c+"?page="+b
      ) {

      }else {
        console.log('sidebar id not found')
        this.router.navigate(['/admin/dashboard'])
      }
      console.log(this.role)
    } else if (localStorage.getItem('Admin')) {
      var token = localStorage.getItem('Admin');
      var decode = jwt_decode(token);
      this.role = decode.role
      var a = window.location.href
      var b = a.substring(a.lastIndexOf('=')+1)
      console.log(b)
      if (this.role === "Admin" && this.router.url === "/admin/dashboard/view-orders") {
        this.router.navigate(['/admin/dashboard'])
      }
      if (this.role === "Admin" && this.router.url === "/admin/dashboard/view-users"||
      this.router.url === "/admin/dashboard/view-users?page="+b) {
        this.router.navigate(['/admin/dashboard'])
      }
      if (this.role === "Admin" && this.router.url === "/admin/dashboard/Admin") {
        this.router.navigate(['/admin/dashboard'])
      }
      console.log(this.role)
    }


  }
}
