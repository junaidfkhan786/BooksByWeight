import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  session = false;
  UserData: any;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }
opened :boolean;

@Output() openedevent = new EventEmitter<boolean>()
  ngOnInit() {

    this.isLogin();

  }

  togglesidebar(){

   this.openedevent.emit(this.opened = !this.opened) 

  
  }

  isLogin() {
    
    if (localStorage.getItem('AdminUser') != null) {
      var token = localStorage.getItem('AdminUser').slice(1,-1);
     
      this.UserData = token;
      this.session = true;
      this.spinner.hide();
    }
  }

  logout(){
    localStorage.removeItem('AdminUser');
    
    this.toastr.success('Logout Successfull', 'BooksByWeight', {
      timeOut: 1000,
    });
    
    this.router.navigate(['/admin']); 
  }

}
