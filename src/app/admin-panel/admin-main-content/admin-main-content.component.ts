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
import * as jwt_decode from 'jwt-decode';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FormControl, FormGroup } from '@angular/forms';
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
  public gocform: FormGroup;
  couponslength: any
  orderslength: any
  book: any = [];
  users: any;
  user1: any;
  count: number;
  excel = null;
  exceljson = []
  totalBooks: number;
  button: boolean
  role: string
  goc_dollar: number = null;
  goc_euro: number = null;
  goc_pound: number = null;
  goc_aus_dollar: number = null;
  public result: any;
  ngOnInit() {
    this.createform()
    this.goc_dollar = null
    this.goc_euro = null
    this.goc_pound = null
    this.goc_aus_dollar = null
    this.button = true
    this.loadbook();
    this.loaduser();
    this.getadmin();
  }
  createform() {
    this.gocform = new FormGroup({
      'goc_dollar': new FormControl(null),
      'goc_euro': new FormControl(null),
      'goc_aus_dollar': new FormControl(null),
      'goc_pound': new FormControl(null)
    })
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
  message: string
  filename: string;
  filename1: string
  convertids(event) {
    // let file = event.target.files[0];
    // this.excelexp.processFileToJson({}, file).subscribe(data => {
    //   this.result = data['sheets'].Sheet1
    //   console.log(this.result)
    //   this.ConvertJsonToExcel(this.result)
    // })
    const target: DataTransfer = <DataTransfer>(event.target);

    try {

      if (!this.validateFile(target.files[0].name)) {
        throw { type: "please upload excel file" };
      } else if (target.files.length !== 1) {
        throw { multiple: "Cannot use multiple files" };
      } else {
        this.filename = target.files[0].name
        // this.spinner.show();
        const reader: FileReader = new FileReader();

        reader.onload = (e: any) => {
          const bstr: string = e.target.result;

          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true, dateNF: 'mm/dd/yyyy', raw: false });

          const wsname: string = wb.SheetNames[0];

          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          let convertedjson = XLSX.utils.sheet_to_json(ws, { defval: "" });

          this.ConvertJsonToExcel(convertedjson);

        };

        reader.readAsBinaryString(target.files[0]);
      }
    } catch (error) {
      if (error.type) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.type,
        })
      } else if (error.multiple) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.multiple,
        })
      }

    }

    //getting the complete sheet
    // console.log(worksheet);

    // var headers = {};
    // var data: any = [];
    // for (var z in ws) {
    //   if (z[0] === "!") continue;
    //   //parse out the column, row, and value
    //   var col = z.substring(0, 1);
    //   // console.log(col);

    //   var row = parseInt(z.substring(1));
    //   // console.log(row);

    //   var value = ws[z].v;
    //   // console.log(value);

    //   //store header names
    //   if (row == 1) {
    //     headers[col] = value;
    //     // storing the header names
    //     continue;
    //   }

    //   if (!data[row]) data[row] = {};
    //   data[row][headers[col]] = value;


    // }
    // //drop those first two rows which are empty
    // data.shift();
    // data.shift();
    // console.log(data)
    //   this.ConvertJsonToExcel(roa);

    // };

    // reader.readAsBinaryString(target.files[0]);
  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);

    if (ext.toLowerCase() == 'xls') {
      return true;
    } else if (ext.toLowerCase() == 'xlsx') {
      return true;
    }
    else {
      return false;
    }
  }

  gocsubmit() {
    this.goc_dollar = this.gocform.value.goc_dollar
    this.goc_euro = this.gocform.value.goc_euro
    this.goc_aus_dollar = this.gocform.value.goc_aus_dollar
    this.goc_pound = this.gocform.value.goc_pound
    console.log(this.goc_dollar)
    console.log(this.goc_euro)
    console.log(this.goc_pound)
    console.log(this.goc_aus_dollar)

  }
  Allcategories: any = []
  ConvertJsonToExcel(data) {
    this.cat.getCategory().subscribe(
      (categories) => {
        this.Allcategories = categories
        this.exceljson = data

        for (let i = 0; i < this.exceljson.length; i++) {
          if (this.exceljson[i].categories == undefined) {
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: 'Please Upload Correct Data File',
            })
            this.spinner.hide()
            this.exceljson = null
            break
          }
          for (let j = 0; j < this.Allcategories.length; j++) {
            for (let k = 0; k < this.Allcategories[j].subcategory.length; k++) {
              this.exceljson[i]['categories'] = this.exceljson[i].categories.toLowerCase()
              this.Allcategories[j]['category'] = this.Allcategories[j].category.toLowerCase()
              this.exceljson[i]['subcategory'] = this.exceljson[i].subcategory.toLowerCase()
              this.Allcategories[j].subcategory[k]['name'] = this.Allcategories[j].subcategory[k].name.toLowerCase()

/* step 1 */ this.exceljson[i]['final_price'] = this.exceljson[i]['rate'] * this.exceljson[i]['weight'] / 1000

/* step 2 */  if (this.exceljson[i]['mrp_dollar'] != null || this.exceljson[i]['mrp_euro'] != null || this.exceljson[i]['mrp_aus_dollar'] != null || this.exceljson[i]['mrp_pound'] != null) {
                if (this.exceljson[i]['mrp_dollar'] && this.goc_dollar != null) {
                  this.exceljson[i]['mrp_inr'] = this.exceljson[i]['mrp_dollar'] * this.goc_dollar
                } else if (this.exceljson[i]['mrp_euro'] && this.goc_euro != null) {
                  this.exceljson[i]['mrp_inr'] = this.exceljson[i]['mrp_euro'] * this.goc_euro
                } else if (this.exceljson[i]['mrp_aus_dollar'] && this.goc_aus_dollar != null) {
                  this.exceljson[i]['mrp_inr'] = this.exceljson[i]['mrp_aus_dollar'] * this.goc_aus_dollar
                } else if (this.exceljson[i]['mrp_pound'] && this.goc_pound != null) {
                  this.exceljson[i]['mrp_inr'] = this.exceljson[i]['mrp_pound'] * this.goc_pound
                } else {
                  this.exceljson[i]['mrp_inr'] = this.exceljson[i]['final_price']
                }

              }
/* step 3 */ this.exceljson[i]['discount_rs'] = this.exceljson[i]['mrp_inr'] - this.exceljson[i]['final_price']
/* step 4 */ this.exceljson[i]['discount_per'] = this.exceljson[i]['discount_rs'] / this.exceljson[i]['mrp_inr'] * 100
/* step 5 */this.exceljson[i]['sale_price'] = this.exceljson[i]['sale_rate'] * this.exceljson[i]['weight'] / 1000
/* step 6 */this.exceljson[i]['sale_disc_inr'] = this.exceljson[i]['mrp_inr'] - this.exceljson[i]['sale_price']
/* step 7 */this.exceljson[i]['sale_disc_per'] = this.exceljson[i]['sale_disc_inr'] / this.exceljson[i]['mrp_inr'] * 100
/* step 8 */ if (this.exceljson[i]['categories'] == this.Allcategories[j]['category']) {
                this.exceljson[i]['categories'] = this.Allcategories[j]['_id']
              }
/*step 9 */  if (this.exceljson[i]['subcategory'] == this.Allcategories[j].subcategory[k]['name']) {
                this.exceljson[i]['subcategory'] = this.Allcategories[j].subcategory[k]['_id']
              }

            }

          }



        }

        this.exportexcel(this.exceljson)
      }, (error) => {
        throwError(error)
      }, () => {
        console.log('All Categories Fetch In Bulk Books Upload')
      }
    )

  }

  exportexcel(exceljson) {
    var date = new Date();
    var name =
      ("00" + (date.getMonth() + 1)).slice(-2)
      + "/" + ("00" + date.getDate()).slice(-2)
      + "/" + date.getFullYear() + " "
      + ("00" + date.getHours()).slice(-2) + ":"
      + ("00" + date.getMinutes()).slice(-2)
      + ":" + ("00" + date.getSeconds()).slice(-2);


    let filename = name + ' ' + "BooksByWeight"


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

  getadmin() {
    if (localStorage.getItem('SuperAdmin')) {
      var token = localStorage.getItem('SuperAdmin');
      var decode = jwt_decode(token);
      this.role = decode.role
      if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/view-orders") {

      }
      else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/view-users") {

      }
      else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/Admin") {

      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/Coupon") {

      }
      else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/View-Cat-&&-SubCat") {

      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/add-bulk-products") {

      } else if (this.role === "SuperAdmin" && this.router.url === "/admin/dashboard/view-products") {

      } else {
        this.router.navigate(['/admin/dashboard'])
      }
      console.log(this.role)
    } else if (localStorage.getItem('Admin')) {
      var token = localStorage.getItem('Admin');
      var decode = jwt_decode(token);
      this.role = decode.role
      if (this.role === "Admin" && this.router.url === "/admin/dashboard/view-orders") {
        this.router.navigate(['/admin/dashboard'])
      }
      if (this.role === "Admin" && this.router.url === "/admin/dashboard/view-users") {
        this.router.navigate(['/admin/dashboard'])
      }
      if (this.role === "Admin" && this.router.url === "/admin/dashboard/Admin") {
        this.router.navigate(['/admin/dashboard'])
      }
      console.log(this.role)
    }


  }

}
