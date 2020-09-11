import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
  admincreate: NgForm;
  constructor(
   
  ) { }

  ngOnInit(): void {
  }

register ={
  email: null,
  name:null,
  phonenumber:null,
  password:null
}

}
