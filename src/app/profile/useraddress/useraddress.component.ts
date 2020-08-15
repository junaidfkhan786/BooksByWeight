import { useradd } from './../../models/useraddress.model';
import { UserAddressService } from './../../services/user-address.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  but :boolean;
  constructor(
    private gettingadd: UserAddressService,
    private modalService: ModalManager,
    private toastr: ToastrService,
  ) { this.add = new useradd(); }
  ngOnInit(): void {
    this.div = false
    this.but = !false
    this.gettingadd.getrefresuser().subscribe(() => {
      this.getadd();
    })
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
  Swal.fire({
    title: 'Are you sure?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {

    if (result.value) {
      this.gettingadd.deladd().subscribe((del) => {
        this.toastr.error('Address Has Been Remove', 'BooksByWeight', {
          timeOut: 1000,
        });
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
  this.but = !this.but
}
    })
  }
  submitadd() {
    let resp = this.gettingadd.postadd(this.add)
    resp.subscribe((response) => {
      console.log(response)
      this.div = false;
      this.but = true;
      
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
showadd(){
  this.div = !this.div
}
}
