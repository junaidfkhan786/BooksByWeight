import { UserEditService } from './../../services/user-edit.service';
import { UserAcc } from './../../models/useracc.model';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { pluck, map } from 'rxjs/operators';
import { useradd } from 'src/app/models/useraddress.model';
import { formatCurrency } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-account-edit',
  templateUrl: './user-account-edit.component.html',
  styleUrls: ['./user-account-edit.component.css']
})
export class UserAccountEditComponent implements OnInit {

  @ViewChild('userform') userform: NgForm;
  user: UserAcc
  user1: any;
  name: any;
  phonenumber: any;
  email: any;
  message: any;
  constructor(
    private useredit: UserEditService,
    private spinner: NgxSpinnerService,
    private router : Router,
    private toastr: ToastrService
  ) {
    this.user = new UserAcc();
  }

  ngOnInit(): void {
    this.spinner.show();
    if (localStorage.getItem('User') != null) {
      this.useredit.getrefresuseracc().subscribe(() => {
        this.getuser();
        this.spinner.hide();
      })

      this.getuser()
  
    }if (localStorage.getItem('User') == null) {
      this.spinner.hide()
      this.router.navigate[('/login')]
    }
  }

  getuser() {

    this.useredit.getuser().subscribe(res => {

      this.user1 = res[0];
      if (this.user1.local) {

        this.userform.setValue({
          name: this.user1.local.name,
          phonenumber: this.user1.local.phonenumber,
          email: this.user1.local.local_email

        })
      }
      if (this.user1.google) {

        this.userform.setValue({
         
          name: this.user1.google.name,
          phonenumber: "please enter your mobile number to Update Profile",
          email: this.user1.google.google_email

        })
      }
      if (this.user1.facebook) {

        this.userform.setValue({
          name: this.user1.facebook.name,
          phonenumber: "please enter your mobile number to Update profile",
          email: this.user1.facebook.facebook_email

        })
      }
    })
    this.spinner.hide();
  }

  submituser(user) {
    console.log(user)
if(this.userform.valid){
this.useredit.edituser(user).subscribe((res) => {
  console.log(res)
  this.userform.resetForm()
  this.message = res.message
  this.toastr.success(this.message, 'BooksByWeight', {
    timeOut: 2000,
  });
})
}
  }

}
