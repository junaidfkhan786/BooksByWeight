import { Forgotpass } from 'src/app/models/forgotpass.model';
import { ForgotpassService } from './../services/forgotpass.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  Error = false;
  Success =false;
  message : string;
  succ_message : string;
user : Forgotpass =new Forgotpass();
  constructor(private forgetSer : ForgotpassService,private router: Router) { 
    

  }

  ngOnInit() {

 this.jquery_code();  

}

jquery_code(){
 
}

sendOtp(phonenumber = this.user.phonenumber){

  this.forgetSer.sendOTp(phonenumber).subscribe(Response =>{
    if(Response){
      console.log(Response);
      this.Success = true;
      this.Error = false;
      this.succ_message = "OTP SEND SUCCESSFULLY TO" + "  " + phonenumber;
      
    }
  },error => {
    if(JSON.parse(JSON.stringify(error.error)) == "phonenumber doesnt exist"){
      console.error(error);
      this.Success = false;
      this.Error = true;
      this.message = "PHONENUMBER IS NOT REGISTERED";
    }else{
      console.error(error);
      this.Error = true;
      this.Success = false;
          this.message = "ENTER PHONENUMBER";
    }
 
  })

}
changePw(phonenumber = this.user.phonenumber,otp = this.user.otp, password= this.user.password){
  let resp =  this.forgetSer.ChangePass(phonenumber,otp,password);
  resp.subscribe(
    (data) => {
      if(data){
        
       this.Error = false;
        this.Success = true;
        this.succ_message = "PASSWORD CHANGE SUCCESSFULLY";

        setTimeout(()=>{
        this.router.navigate(['/login']);  
        },1000);
      }
    },
    (error) => {
      if(JSON.parse(JSON.stringify(error.error)) == "Verification Failed"){
        
        this.Success = false;
        this.Error = true;
        this.message = "VERIFICATION FAILED";
        
      }else{
        
        this.Success = false;
        this.Error = true;
        this.message = "SEND OTP AGAIN";
      }
      if(JSON.parse(JSON.stringify(error.error)) == "Wrong phone number or code :("){
        
        this.Success = false;
        this.Error = true;
        this.message = "PLEASE ENTER 6 DIGIT OTP";
      }
     
    
    }
  )
  }

}

