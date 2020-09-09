import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
  admincreate: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  setFormState(): void {
    this.admincreate = this.formbuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      role:'Admin',
      phonenumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
