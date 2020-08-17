import { Component, OnInit, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Register } from 'src/app/models/register.model';
import { RegisterService } from './../services/register.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: Register = new Register();

  message: string;
  err_message: string;
  Error = false;
  succ_message: string;
  Success = false;
  public phonenumber: any;
  token: any;
  constructor(private service: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.jquery_code();
  }
  jquery_code() {
    $(document).ready(function () {
      $("#resend").hide();
      $("#otpform").hide();
      $(".bi").hide();
      $("#register").click(function () {

      });

    });
  }
  public register() {
    let resp = this.service.AddUser(this.user);
    this.phonenumber = this.user.phonenumber;
    resp.subscribe(
      (data) => {
        console.log(data)
        if (data) {
          $("#resend").show();
          this.Success = true;
          this.Error = false;
          this.succ_message = "OTP SEND SUCCESSFULLY";
        }

      },
      (error) => {
console.log(error)
        if (JSON.parse(JSON.stringify(error.error)) == '"Check Phonenumber"') {
          $("#resend").show();
          $("#otpform").hide();
          $(".bi").hide();
          $("#registerform").show();
          console.error(error);
          this.Success = false;
          this.Error = true;
          this.message = "CHECK PHONENUMBER";
        } else {
          $("#resend").hide();
          $("#otpform").hide();
          $(".bi").hide();
          $("#registerform").show();
          console.error(error);
          this.Error = true;
          this.Success = false;
          this.message = "PHONENUMBER IS ALREADY REGISTERED";

        }

      }
    )
    $(document).ready(function () {
      $("#registerform").hide();
      $("#otpform").show();
      $(".bi").show();
    });
  }

  public arrow() {
    $(document).ready(function () {
      $("#registerform").show();
      $("#otpform").hide();
      $(".bi").hide();
    });
  }
  public resendOtp(phonenumber = this.user.phonenumber) {

    this.service.resendOTp(phonenumber).subscribe(Response => {
      if (Response) {
        this.Success = true;
        this.Error = false;
        this.succ_message = "RESEND OTP SUCCESSFULLY";

      }
    }, error => {

      this.Success = false;

      this.Error = true;
      this.message = "CHECK PHONENUMBER";

    })

  }
  public verifyOtp(phonenumber = this.user.phonenumber, otp = this.user.otp, user = this.user) {
    let resp = this.service.Verify(phonenumber, otp, user);

    resp.subscribe(
      (data) => {
        if (data) {
          this.token = data.token
          this.Error = false;
          this.Success = true;
          localStorage.setItem("User", JSON.stringify(this.token));
          this.succ_message = "REGISTRATION SUCCESSFULL";
          setTimeout(()=>{
            this.router.navigate(['/']);
          },2000);
        }

      },
      (error) => {
        if (JSON.parse(JSON.stringify(error.error)) == '"Verification Failed"') {

          this.Error = true;
          this.Success = false;
          this.message = "OTP INCORRECT";
        } else {

          this.Success = false;
          this.Error = true;
          this.message = "ENTER OTP CORRECTLY";
        }

      }
    )
  }
}
