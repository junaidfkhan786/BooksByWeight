import { useradd } from './../../models/useraddress.model';
import { UserAddressService } from './../../services/user-address.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-useraddress',
  templateUrl: './useraddress.component.html',
  styleUrls: ['./useraddress.component.css']
})
export class UseraddressComponent implements OnInit {
  @ViewChild('addform') addform:NgForm;
  button : boolean;
  formbutton:boolean;
addid:any;

  message: any;
  add:useradd;
    messageadd: string;
  err_message: string;
  Error = false;
  succ_message: string;
  Success = false;

  address1: any = [];
  div:boolean;
  but :boolean;
  constructor(
    private gettingadd: UserAddressService,
    private toastr: ToastrService,
  ) {
     this.add = new useradd();
     }

  ngOnInit(): void {
    this.div = false
    this.but = true
    this.gettingadd.getrefresuser().subscribe(() => {
      this.getadd();
    })
        this.getadd();
  }

del(id){
  Swal.fire({
    title: 'Are you sure?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {

    if (result.value) {
      this.gettingadd.deladd(id).subscribe((del) => {
       
      })
    Swal.fire(
      'Deleted!',
      'Your imaginary file has been deleted.',
      'success'
    )
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your imaginary Address is safe :)',
      'error'
    )
    }
  })


}

  getadd() {
    this.gettingadd.getaddress().subscribe((resp) => {
      this.address1 = resp
      console.log(this.address1)
    }, (error) => {
if(error){
  this.message = error.message
  console.log(this.message)
  this.div = !this.div
  this.but = !this.but
  
}
    })
  }
  submitadd() {
 if(this.addform.valid){

  if(this.formbutton){
    let respedit = this.gettingadd.editaddress(this.addid,this.add);
    respedit.subscribe((res)=>{
     this.addform.resetForm();
     this.formbutton = false
    })
  }else{
    let resp = this.gettingadd.postadd(this.add)
    resp.subscribe((response) => {
      console.log(response)
      this.div = false;
      this.but = true;
      this.formbutton = false
      
    }, (error) => {
      this.messageadd = error.error.message
      console.log(this.messageadd)
    })
  }
  
 }
  }

 

edit(add ){
  console.log(add)
  this.button = true
  this.formbutton = true
  this.div= true

  this.addform.setValue({
    fullName: add.fullName,
    mobileNumber : add.mobileNumber,
    alternatePhoneNumber : add.alternatePhoneNumber,
    address : add.address,
    state : add.state,
    city   : add.city,
    landmark : add.landmark,
    pinCode  : add.pinCode

  })
  this.addid = add._id 
}

showadd(){
  this.div = !this.div
  this.button = !this.button
  this.formbutton = false
  this.addform.resetForm();
}
}
