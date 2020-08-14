import { useradd } from './../../models/useraddress.model';

import { UserAddressService } from './../../services/user-address.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalManager } from 'ngb-modal';
import { interval } from 'rxjs';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-useraddress',
  templateUrl: './useraddress.component.html',
  styleUrls: ['./useraddress.component.css']
})
export class UseraddressComponent implements OnInit {
  @ViewChild('myModal') myModal;
  id:any;
  private modalRef;
  message: any;
  add:useradd;
    messageadd: string;
  err_message: string;
  Error = false;
  succ_message: string;
  Success = false;
  public mobileNumber: any;
  public alternatePhoneNumber: any;
  public address: any;
  public city: any;
  public state: any;
  public landmark: any;
  public fullName: any;
  public pincode: any;
  address1: any = [];
  div:boolean;
  constructor(
    private gettingadd: UserAddressService,
    private modalService: ModalManager,
    private toastr: ToastrService,
  ) { this.add = new useradd(); }

  ngOnInit(): void {

        this.getadd();
 
   

  }

  on() {
    document.getElementById('overlay').style.display = 'block';
  }
  off() {
    document.getElementById('overlay').style.display = 'none';
  }

  openModal(id){
    this.modalRef = this.modalService.open(this.myModal, {
        size: "lg",
        modalClass: 'mymodal',
        hideCloseButton: true,
        centered: true,
        backdrop: false,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: false,
        backdropClass: "modal-backdrop"
    })

    this.id = id;
}
del(){

    // return confirm("are you sure?");
    this.gettingadd.deladd().subscribe((del) => {
      this.toastr.error('Address Has Been Remove', 'BooksByWeight', {
        timeOut: 1000,
      });
      window.location.reload()
    })
  
}
closeModal(){
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
}

  getadd() {
    this.gettingadd.getaddress().subscribe((resp) => {

      this.address1 = resp
     

    }, (error) => {

if(error){
  this.div = !this.div
}

    })

  }

  submitadd() {


    let resp = this.gettingadd.postadd(this.add)
    resp.subscribe((response) => {

      console.log(response)
      window.location.reload()
    }, (error) => {
      this.messageadd = error.error.message
      console.log(this.messageadd)
    })
   


  }

edit(){
  console.log(this.id,this.add)

  // let resp = this.gettingadd.editadd(this.id,this.add)
  // resp.subscribe((response) => {

  //   console.log(response)
  // }, (error) => {
  //   this.messageadd = error.error.message
  //   console.log(this.messageadd)
  // })

}

}
