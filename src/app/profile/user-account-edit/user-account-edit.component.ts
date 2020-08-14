import { UserEditService } from './../../services/user-edit.service';
import { UserAcc } from './../../models/useracc.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-account-edit',
  templateUrl: './user-account-edit.component.html',
  styleUrls: ['./user-account-edit.component.css']
})
export class UserAccountEditComponent implements OnInit {
user :any = new UserAcc();
user1:AudioNode;
  constructor(
    private useredit : UserEditService
  ) { }

  ngOnInit(): void {
    this.getuser();
  }

  getuser(){
  this.useredit.getuser().subscribe((user) => {
    
    this.user1 = user
    console.log(this.user1);
  })
  }

}
