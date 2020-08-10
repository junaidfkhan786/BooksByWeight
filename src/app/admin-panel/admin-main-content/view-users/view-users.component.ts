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
user2:any = [];
user3:any = [];
id:any = [];
id1:any = []
count:number;

  constructor(private user: UsersService) { }

  ngOnInit(): void {
    this.loaduser();
    this.pages;
  }

  loaduser() {

    this.user.getUsers().subscribe((user) => {
      this.users = user
this.count = this.users.count
      this.user1 = user.users

 var i:any
var j:any
 for(i = 0; i <= this.user1.length; i++){
 if(this.user1[i] == undefined){
   return false

}
this.user2.push(this.user1[i].google || this.user1[i].local || this.user1[i].facebook);

}
console.log(this.user2)

// for(j = 0; j <= this.user2.length; j++){
  
//   if(this.user2[j] != undefined){

//     console.log(this.user2[j].google_email || this.user2[j].facebook_email || this.user2[j].local_email)
  
//   }
// }
})


  }

  onPageChange(page: number = 1) {
    this.pages = page;
  
    window.scrollTo(0, 60);
  }


}
