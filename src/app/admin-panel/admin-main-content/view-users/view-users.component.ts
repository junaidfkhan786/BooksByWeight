import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  pages: number = 1;
  users: any = [];
  user1: any

  constructor(private user: UsersService) { }

  ngOnInit(): void {
    this.loaduser();
    this.pages;
  }

  loaduser() {

    this.user.getUsers().subscribe((user) => {
      this.users = user

      this.user1 = user.users

    })

  }

  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 60);
  }


}
