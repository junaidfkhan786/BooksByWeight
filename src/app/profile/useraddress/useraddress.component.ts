import { useradd } from './../../models/useraddress.model';

import { UserAddressService } from './../../services/user-address.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalManager } from 'ngb-modal';

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
  add: useradd = new useradd();
  div1: boolean = false;
  div2: boolean = true;
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
  public locality: any;
  public pincode: any;
  address1: any = [];
  constructor(
    private gettingadd: UserAddressService,
    private modalService: ModalManager
  ) { }

  ngOnInit(): void {
    this.div1 = false;
    this.div2 = true;
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
closeModal(){
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
}

  getadd() {
    this.gettingadd.getaddress().subscribe((resp) => {

      this.address1 = resp

      console.log(this.address1)

    }, (error) => {

      this.message = error.error
      console.log(this.message)
    })

  }

  submitadd() {

    let resp = this.gettingadd.postadd(this.add)
    resp.subscribe((response) => {

      console.log(response)
    }, (error) => {
      this.messageadd = error.error.message
      console.log(this.messageadd)
    })

    this.div1 = false
    this.div2 = true


  }
  addaddress() {
    this.div1 = true
    this.div2 = false
  }
edit(){
  
  let resp = this.gettingadd.editadd(this.id,this.add)
  resp.subscribe((response) => {

    console.log(response)
  }, (error) => {
    this.messageadd = error.error.message
    console.log(this.messageadd)
  })

}
}
