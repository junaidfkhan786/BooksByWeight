import { LoginService } from './../services/login.service';
import { Login } from './../models/login.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,  Validators, FormGroup } from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myform : FormGroup;
  message : string = "PHONENUMBER/PASSWORD INCORRECT";
  Error = false;
  succ_message : string;
  Success = false;
  user : Login = new Login()
  User: SocialUser = new SocialUser();
  loggedIn = false;
  succ : any;
  
    constructor( private authService: SocialAuthService, private formbuilder : FormBuilder,private loginService : LoginService,
      private router : Router
      ) { }

      signInWithGoogle(googleId = this.User.id,name= this.User.name,email = this.User.email,user = this.User): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data =>
          {
            
            
           this.loginService.loginGoogle(googleId = data.id,name=data.name,email = data.email).subscribe(result=>{
            
             if(result){
               this.succ = result;
              this.Success = true;
              this.Error = false;
              this.succ_message = "Login SuccessFull";
              localStorage.setItem("User", JSON.stringify(this.succ.token) );
              setTimeout(()=>{
                this.router.navigate(['/']);
              },2000);
             
             }
           },err=>{
             console.error(err);
           })
           
          }
          );
       
      }
     
      signInWithFB(facebookId = this.User.id,name= this.User.name,email = this.User.email,user = this.User): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data =>
          {
            
            
           this.loginService.loginFacebook(facebookId = data.id,name=data.name,email = data.email).subscribe(result=>{
            
             if(result){
               this.succ = result;
              this.Success = true;
              this.Error = false;
              this.succ_message = "Login SuccessFull";
              localStorage.setItem("User", JSON.stringify(this.succ.token) );
              setTimeout(()=>{
                this.router.navigate(['/']);
              },2000);
             
             }
           },err=>{
             console.error(err);
           })
           
          }
          );
      }
     
      signOut(): void {
        this.authService.signOut();
      }
     
      setFormState(): void{
        this.myform = this.formbuilder.group({
          phonenumber : ['',[Validators.required]],
          password : ['',[Validators.required]]
        });
      }
      
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.User = user;
    });
    
    
    this.setFormState();

   
    
   
  }
  onSubmit(){
    let login=this.myform.value;
    this.login(login);
  }
  
  login(login : Login){
    this.loginService.login(login).subscribe(
      data=>{
        
         this.succ = data;
        if(this.succ){
          
          this.myform.reset();
          this.Success = true;
          this.Error = false;
          this.succ_message = "Login SuccessFull";
          localStorage.setItem("User", JSON.stringify(this.succ.token) );
          setTimeout(()=>{
            this.router.navigate(['/']);
          },2000);
         
        }
      },
      error => {
        
        
        if(error){
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
