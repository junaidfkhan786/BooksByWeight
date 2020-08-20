import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { map, toArray, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
  user2: any = [];
  user3: any;
  userlocal: any = []
  usergoogle: any = [];
  userfacebook: any = [];
  id: any = [];
  id1: any = []
  google: any = [];
  local: any = [];
  facebook: any = [];
  count: number;
  config: any;
  button: boolean;

  constructor(
    private user: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {

    this.config = {
      itemsPerPage: 5,
      currentPage: this.pages,
      totalItems: this.count
    };
  }
  ngOnInit() {
   this.button = true
    this.spinner.show()
    this.user.getrefresuser().subscribe(() => {
      this.loaduser();
      this.spinner.hide();
    })
    this.loaduser();
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
  loaduser() {
    this.user.getUsers().subscribe((user) => {
      this.users = user

      this.count = this.users.totaluser
      this.user1 = user.users
    
      var i: any
      for (i = 0; i <= this.user1.length - 1; i++) {
        this.user2.push(this.user1[i])

   
      }
      console.log(this.user2)
      this.spinner.hide();
    })
  }


  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
  }



}
