import { UserEditService } from './../../services/user-edit.service';
import { UserAcc } from './../../models/useracc.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-account-edit',
  templateUrl: './user-account-edit.component.html',
  styleUrls: ['./user-account-edit.component.css']
})
export class UserAccountEditComponent implements OnInit {
user:UserAcc
user1:any;
  constructor(
    private useredit : UserEditService,
    private spinner: NgxSpinnerService,
  ) {
    this.user = new UserAcc();
   }

  ngOnInit(): void {
    this.spinner.show();
    this.getuser();
  }

  getuser(){
  this.useredit.getuser().subscribe((user) => {
    
    this.user1 = user
   
  })
  this.spinner.hide();
  }

  submituser(){

  }

  edit(user){

    console.log(user)

  }

}
