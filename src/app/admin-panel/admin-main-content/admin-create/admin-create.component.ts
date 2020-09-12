import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from 'src/app/services/admin-login.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder, NgForm
} from '@angular/forms';
@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
  public admincreate: FormGroup;
  button: boolean = false
  adminbutton: boolean
  alladmin: any = []
  i: number;
  pages: number
  constructor(
    private admin: AdminLoginService
  ) { }

  ngOnInit(): void {
    this.adminbutton = false
    this.button = false
    this.admin.getadminload().subscribe(() => {
      this.getadmins();
    })
    this.getadmins();
    this.createform();
  }
  createform() {
    this.admincreate = new FormGroup({
      'name': new FormControl(null),
      'phonenumber': new FormControl(null),
      'password': new FormControl(null),
      'role': new FormControl('Admin')
    })
  }
  // register = {
  //   email: null,
  //   name: null,
  //   role: 'Admin',
  //   phonenumber: null,
  //   password: null
  // }
  a: boolean = false
  f: string = ""
  submit() {
    console.log(this.admincreate.value)
    this.admin.register(this.admincreate.value).subscribe((data) => {
      console.log(data)
      if (data.message == "Admin Already Exist") {
        Swal.fire({
          icon: 'info',
          title: 'Phone Number Already Exist',
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Admin Created SuccessFully',
        })
        this.admincreate.reset();
        this.addadmin();
      }
      
    }, (error) => {
      console.log(error)
    })


  }

  getadmins() {
    this.admin.getadmin().subscribe((resp) => {
      this.alladmin = resp;
    })
  }
  deleteadmin(id) {
    this.admin.delete(id).subscribe((response) => {
      if (response) {
        Swal.fire({
          icon: 'error',
          title: 'Admin Deleted SuccessFully',
        })
      }
    })
  }
  addadmin() {
    this.button = !this.button
    this.adminbutton = !this.adminbutton
  }
  onPageChange(page: number = 1) {
    this.pages = page;
    window.scrollTo(0, 520);
  }
}
