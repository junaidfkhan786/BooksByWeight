import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
@Component({
  selector: 'app-admin-main-content',
  templateUrl: './admin-main-content.component.html',
  styleUrls: ['./admin-main-content.component.css']
})
export class AdminMainContentComponent implements OnInit {
  constructor(
    public router: Router,
    private newService: BooksService,
    private user: UsersService,
    private bulkbook: SaveSingleBookService,
    private ngZone: NgZone,
    private allorders: AdminOrdersService
  ) {
    this.allorders.totalorders.subscribe(
      (total) => {
        this.orderslength = total
      }
      )
   }
   orderslength:any
  book: any = [];
  users: any;
  user1: any;
  count: number;
  excel = null;
  totalBooks: number;
  button:boolean
  ngOnInit() {
    this.button = true
    this.loadbook();
    this.loaduser();
  }
  totalbook1: number;
  recieve2($event) {
    this.totalbook1 = $event;
  }
  loadbook() {
    this.newService.getBooks().subscribe((data) => {
      this.book = data
      this.totalBooks = data.books.length;
    });
  }
  loaduser() {
    this.user.getUsers().subscribe((user) => {
      this.users = user

      this.count = this.users.totaluser
    })
  }

  getfile(event) {
    this.excel = event.target.files[0];
this.button = false
  console.log(this.excel)
  }
  addbulk() {

    const form = new FormData()
    form.append('excel_file',
      this.excel,
      this.excel.name)
  this.bulkbook.bulkbook(form).subscribe(
    (data) => {
      if (data) {
        Swal.fire({
          title: 'Books Uploaded SuccessFully?',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Done'
        }).then((result) => {
          if (result.value) {

            this.ngZone.run(() => this.router.navigate(['/admin/dashboard/view-products'])).then();
          }
        })
      } else {
        Swal.fire({
          title: 'Books Uploading failed?',
          icon: 'error',
        })
      }
    }
  )

  }
}
