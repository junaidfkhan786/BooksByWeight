import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminLogin } from 'src/app/models/admin-login.model'
import { AdminLoginService } from 'src/app/services/admin-login.service'
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  myform: FormGroup;
  message: string = "PHONENUMBER/PASSWORD INCORRECT";
  Error = false;
  succ_message: string;
  Success = false;
  adminuser: AdminLogin = new AdminLogin()
  loggedIn = false;
  succ: any;
  role: any
  token: any
  constructor(
    private formbuilder: FormBuilder,
    private AdminLoginService: AdminLoginService,
    private router: Router,
    private Spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.setFormState();
  }

  setFormState(): void {
    this.myform = this.formbuilder.group({
      phonenumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    let Adminlogins = this.myform.value;

    this.login(Adminlogins);

  }

  login(Adminlogins: AdminLogin) {
    this.Spinner.show();
    this.AdminLoginService.login(Adminlogins).subscribe(
      data => {

        let resp = data
        if (resp) {
          this.myform.reset();
          this.Success = true;
          this.Error = false;
          this.role = resp.role;
          this.token = resp.token;
          this.succ_message = "Login SuccessFull";
          if (this.role == "SuperAdmin") {
            localStorage.setItem('SuperAdmin', this.token)
            setTimeout(() => {
              this.router.navigate(['/admin/dashboard']);
            }, 2000);
          } else if(this.role == "Admin") {
            localStorage.setItem('Admin', this.token)
            setTimeout(() => {
              this.router.navigate(['/admin/dashboard']);
            }, 2000);
          }else{
            alert('Contack Developer')
          }

        } else {
          this.Error = true
          alert('auth failed')
        }
        // if(this.succ){

        //   this.succ = "SuperAdmin"
        //   this.myform.reset();
        //   this.Success = true;
        //   this.Error = false;
        //   this.succ_message = "Login SuccessFull";
        //   localStorage.setItem("AdminUser", JSON.stringify(this.succ) );




        // }
      },
      error => {


        if (error) {
          // alert(JSON.stringify(error["1"]));
          console.error(error);
          this.Success = false;
          this.Error = true;

          this.message;



        }
      }
    )
  }

}
