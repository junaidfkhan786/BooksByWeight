import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
import { Subject, throwError } from 'rxjs';
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
import * as XLSX from 'xlsx';
import { newArray } from '@angular/compiler/src/util';
import { CategoryService } from 'src/app/services/category.service';
import { ExcelexportService } from 'src/app/services/excelexport.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { AdminCouponService } from 'src/app/services/admin-coupon.service';
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
    private allorders: AdminOrdersService,
    private cat: CategoryService,
    private excelexp: ExcelexportService,
    private spinner: NgxSpinnerService,
    private couponservice: AdminCouponService
  ) {
    this.allorders.totalorders.subscribe(
      (total) => {
        this.orderslength = total
      }
    )
  this.couponservice.totalcoupons.subscribe((totalcoupons) => {
    this.couponslength = totalcoupons
  })
  }
  couponslength:any
  orderslength: any
  book: any = [];
  users: any;
  user1: any;
  count: number;
  excel = null;
  exceljson = []
  totalBooks: number;
  button: boolean
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
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];


      //getting the complete sheet
      // console.log(worksheet);

      var headers = {};
      var data: any = [];
      for (var z in ws) {
        if (z[0] === "!") continue;
        //parse out the column, row, and value
        var col = z.substring(0, 1);
        // console.log(col);

        var row = parseInt(z.substring(1));
        // console.log(row);

        var value = ws[z].v;
        // console.log(value);

        //store header names
        if (row == 1) {
          headers[col] = value;
          // storing the header names
          continue;
        }

        if (!data[row]) data[row] = {};
        data[row][headers[col]] = value;


      }
      //drop those first two rows which are empty
      data.shift();
      data.shift();
      this.ConvertJsonToExcel(data);

    };

    reader.readAsBinaryString(target.files[0]);


  }
  Allcategories: any = []
  ConvertJsonToExcel(data) {
    this.spinner.show()
    this.cat.getCategory().subscribe(
      (categories) => {
        this.Allcategories = categories
        this.exceljson = data
        console.log(this.exceljson, this.Allcategories)

        for (let i = 0; i < this.exceljson.length; i++) {
          for (let j = 0; j < this.Allcategories.length; j++) {     
            for (let k = 0; k < this.Allcategories[j].subcategory.length; k++) {
              if(this.exceljson[i]['categories'] == this.Allcategories[j]['category']){
                this.exceljson[i]['categories'] = this.Allcategories[j]['_id']      
              }
              if(this.exceljson[i]['subcategory'] == this.Allcategories[j].subcategory[k]['name']){
                this.exceljson[i]['subcategory'] = this.Allcategories[j].subcategory[k]['_id'] 
              }
            }
              
            }
              console.log(this.exceljson[i])
           
   
        }

        this.exportexcel(this.exceljson)
      }, (error) => {
        throwError(error)
      }, () => {
        console.log('All Categories Fetch In Bulk Books Upload')
      }
    )

  }

  exportexcel(exceljson){
      let filename = new Date() +"BooksByWeight"
      this.excelexp.exportExcel(exceljson, filename);
  }
  addbulk() {

    // const form = new FormData()
    // form.append('excel_file',
    //   this.excel,
    //   this.excel.name)
    // this.bulkbook.bulkbook(form).subscribe(
    //   (data) => {
    //     if (data) {
    //       Swal.fire({
    //         title: 'Books Uploaded SuccessFully?',
    //         icon: 'success',
    //         showCancelButton: false,
    //         confirmButtonColor: '#3085d6',
    //         confirmButtonText: 'Done'
    //       }).then((result) => {
    //         if (result.value) {

    //           this.ngZone.run(() => this.router.navigate(['/admin/dashboard/view-products'])).then();
    //         }
    //       })
    //     } else {
    //       Swal.fire({
    //         title: 'Books Uploading failed?',
    //         icon: 'error',
    //       })
    //     }
    //   }
    // )

  }
}
