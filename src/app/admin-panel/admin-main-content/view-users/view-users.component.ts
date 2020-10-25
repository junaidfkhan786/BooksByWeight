import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLoginService } from 'src/app/services/admin-login.service';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  usersearch: any = "";
  pages: number = 1;
  users: any;
  user1: any;

  id: any = [];
  id1: any = []

  count: number;
  config: any;
  button: boolean;
opened:boolean
  constructor(
    private user: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public router: Router,
    private route:ActivatedRoute,
    private toggle:AdminLoginService
  ) {
    this.toggle.opensidebar.subscribe((toggle)=>{
      this.opened = toggle
    })
    this.config = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: ''
    };

  }
  ngOnInit() {
    this.getadmin();
   this.button = true
    this.spinner.show()
    this.user.getrefresuser().subscribe(() => {
      this.spinner.hide();
    })
 this.load()
  }
  togglesidebar() {
    this.opened = !this.opened
    console.log(this.opened)
    // var a:boolean = this.opened = !this.opened
    if(this.opened == false){
      this.toggle.opensidebar.next(true)
    }else if(this.opened == true){
      this.toggle.opensidebar.next(false)
    }
  }
  block(id) {
    this.user.block(id).subscribe((res)=>{

      this.toastr.error(res.message, 'BooksByWeight', {
        timeOut: 2000,
      });
      window.location.reload()
    })
  }

  unblock(id) {

    this.user.unblock(id).subscribe((res)=>{
      this.toastr.success(res.message, 'BooksByWeight', {
        timeOut: 2000,
      });
      window.location.reload()
    })
  }

  load(){
    if (this.router.url == '/admin/dashboard/view-users' ||
    this.router.url == '/admin/dashboard/view-users?page=' + this.config.currentPage) {
    if (this.router.url == '/admin/dashboard/view-users') {
      console.log('loading all books')
      this.loaduser(1);
    } else {
      this.loaduser(this.config.currentPage);
    }

  }
  }
  loaduser(page) {
    this.user.getUsers(page)
    .pipe(
      map((data)=>{

        let user = data.users
        let local = []
        let google = []
        let facebook = []

        for (let i = 0; i < user.length; i++) {

      if(user[i].local){

        user[i].local['email'] = user[i].local['local_email']
        user[i]['email'] = user[i].local['email']
        user[i]['name'] = user[i].local['name']
        user[i]['phonenumber'] = user[i].local['phonenumber']
        user[i]['password'] = user[i].local['password']
         delete user[i].local


      }
        }
        for (let i = 0; i < user.length; i++) {
          if(user[i].google){
            user[i].google['email'] = user[i].google['google_email']
            user[i]['email'] = user[i].google['email']
            user[i]['googleId'] = user[i].google['googleId']
            user[i]['name'] = user[i].google['name']
            user[i]['phonenumber'] = user[i]['phonenumber']
            delete user[i].google

          }

         }
         for (let i = 0; i < user.length; i++) {
          if(user[i].facebook){
            user[i].facebook['email'] = user[i].facebook['facebook_email']
            user[i]['email'] = user[i].facebook['email']
            user[i]['facebookId'] = user[i].facebook['facebookId']
            user[i]['name'] = user[i].facebook['name']
            user[i]['phonenumber'] = user[i]['phonenumber']
            delete user[i].facebook

          }

         }


        return data



      })
    )
   .subscribe((user) => {
      this.users = user
      this.count = this.users.totaluser
      this.user1 = user.users

      this.spinner.hide();
    })
  }

  onPageChange(page: number = 1) {
    this.config.currentPage = page;
    window.scrollTo(0, 60);
  }

  role: string
  getadmin() {
    if (localStorage.getItem('SuperAdmin')) {
      var token = localStorage.getItem('SuperAdmin');
      var decode = jwt_decode(token);
      this.role = decode.role
      if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/view-orders") {
      }
      else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/view-users") {
      }
      else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/Admin") {
      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/Coupon") {
      }
      else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/View-Cat-&&-SubCat") {
      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/add-bulk-products") {
      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/view-products") {
      } else {
        this.router.navigate(['/admin/dashboard'])
      }
      console.log(this.role)
    } else if (localStorage.getItem('Admin')) {
      var token = localStorage.getItem('Admin');
      var decode = jwt_decode(token);
      this.role = decode.role
      if (this.role === "Admin" && this.router.url === "/admin/dashboard/view-orders") {
        this.router.navigate(['/admin/dashboard'])
      }
      if (this.role === "Admin" && this.router.url === "/admin/dashboard/view-users") {
        this.router.navigate(['/admin/dashboard'])
      }
      if (this.role === "Admin" && this.router.url === "/admin/dashboard/Admin") {
        this.router.navigate(['/admin/dashboard'])
      }
      console.log(this.role)
    }
  }

}
