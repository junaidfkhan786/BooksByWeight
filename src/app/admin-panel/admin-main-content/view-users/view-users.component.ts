import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  pages: number = 1;
  users: any = [];
  user1: any
  user2: any = [];
  user3: any = [];
  id: any= [];
  id1: any = []
  google: any = [];
  local: any = [];
  facebook: any = [];
  count: number;
  config: any;

  constructor(
    private user: UsersService,
    private spinner:NgxSpinnerService
    ) {

    this.config = {
      itemsPerPage: 5,
      currentPage: this.pages,
      totalItems: this.count
    };
   }
  ngOnInit(): void {
    this.spinner.show();
    this.loaduser();

    console.log(this.user2)
  }
  loaduser() {
    this.user.getUsers().subscribe((user) => {
      this.users = user
      this.count = this.users.count
      this.user1 = user.users
      var i: any
      for (i = 0; i <= this.user1.length - 1; i++) {
        this.user2.push(this.user1[i])
      }
      this.spinner.hide();
    })
  }

  pageChanged(event){

    this.config.currentPage = event;

  }

  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
  }


 
}
