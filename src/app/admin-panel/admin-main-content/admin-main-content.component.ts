import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-admin-main-content',
  templateUrl: './admin-main-content.component.html',
  styleUrls: ['./admin-main-content.component.css']
})
export class AdminMainContentComponent implements OnInit {
  constructor(
    public router: Router,
    private newService: BooksService,
    private user : UsersService) { }
  book: any = [];
  users : any = [];
  user1: any;
  count : number;
  totalBooks: number;
  ngOnInit() {
    this.loadbook();
    this.loaduser();
  }
  totalbook1: number;
  recieve2($event) {
    this.totalbook1 = $event;
  }
  loadbook() {
    this.newService.getBooks().subscribe((data) => {
      this.book = data
      this.totalBooks = data.books.length;
    });
  }
  loaduser(){
    this.user.getUsers().subscribe( (user) => {
      this.users = user
    this.count = user.count  
    })
  }
}
