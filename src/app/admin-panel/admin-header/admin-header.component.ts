import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminLoginService } from 'src/app/services/admin-login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  session = false;
  name: string = ""

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toggle:AdminLoginService
  ) { }
  opened: boolean;

  @Output() openedevent = new EventEmitter<boolean>()
  ngOnInit() {
    this.opened = false
    this.isLogin();

  }

  togglesidebar() {
    var a:boolean = this.opened = !this.opened
    this.toggle.opensidebar.next(a)

  }

  isLogin() {

    if (localStorage.getItem('SuperAdmin') != null) {
      var token = localStorage.getItem('SuperAdmin').slice(1, -1);
      var decode = jwt_decode(token);
      this.name = decode.name;
      this.session = true;
      this.spinner.hide();
    } else {
      var token = localStorage.getItem('Admin').slice(1, -1);
      var decode = jwt_decode(token);
      this.name = decode.name;
      this.session = true;
      this.spinner.hide();
    }
  }

  logout() {
    localStorage.removeItem('SuperAdmin');
    localStorage.removeItem('Admin');
    this.toastr.success('Logout Successfull', 'BooksByWeight', {
      timeOut: 1000,
    });

    this.router.navigate(['/admin']);
  }

}
