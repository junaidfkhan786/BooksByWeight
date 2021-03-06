import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
import { Observable, Subject, throwError } from 'rxjs';
import { SaveSingleBookService } from 'src/app/services/save-single-book.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
import * as XLSX from 'xlsx';
import { newArray } from '@angular/compiler/src/util';
import { CategoryService } from 'src/app/services/category.service';
import { ExcelexportService } from 'src/app/services/excelexport.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { AdminCouponService } from 'src/app/services/admin-coupon.service';
import { JsonfilesaverService } from 'src/app/services/jsonfilesaver.service';
import * as jwt_decode from 'jwt-decode';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { single } from 'rxjs/operators';
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
    private couponservice: AdminCouponService,
    private jsonexport: JsonfilesaverService
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
    this.newService.getBooks(1).subscribe((data) => {
      this.book = data
      this.totalBooks = data.totalBooks;
    });
  }
  loaduser() {
    this.user.getUsers(1).subscribe((user) => {
      this.users = user
      this.count = this.users.totaluser
    })
  }
  message: string
  filename: string;
  filename1: string
  convertids(event) {

    const target: DataTransfer = <DataTransfer>(event.target);
    try {
      if (!this.validateFile(target.files[0].name)) {
        throw { type: "please upload excel file" };
      } else if (target.files.length !== 1) {
        throw { multiple: "Cannot use multiple files" };
      } else {
        this.filename = target.files[0].name
        this.spinner.show();
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


  gocedit() {
    this.spinner.show()
    this.goc_dollar = Math.floor(this.gocform.value.goc_dollar)
    this.goc_euro = Math.floor(this.gocform.value.goc_euro)
    this.goc_aus_dollar = Math.floor(this.gocform.value.goc_aus_dollar)
    this.goc_pound = Math.floor(this.gocform.value.goc_pound)
    var  goc = {
      goc_dollar:this.goc_dollar,
      goc_euro:this.goc_euro,
      goc_aus_dollar:this.goc_aus_dollar,
      goc_pound:this.goc_pound

    }
    console.log(goc)
    this.bulkbook.editgoc(goc).subscribe((result)=>{
      this.spinner.hide()
      Swal.fire({
        icon: 'success',
        title: result,
        text: 'Please Wait For 15 Mins To Effect Goc Rate On Books ',
      })
    },(error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sorry Cant Update',
      })
    })
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
              // /* step 1 */ this.exceljson[i]['final_price'] = this.exceljson[i]['rate'] * this.exceljson[i]['weight'] / 1000
              // /* step 2 */  if (this.exceljson[i]['mrp_dollar'] != null || this.exceljson[i]['mrp_euro'] != null || this.exceljson[i]['mrp_aus_dollar'] != null || this.exceljson[i]['mrp_pound'] != null) {
              //                 if (this.exceljson[i]['mrp_dollar'] && this.goc_dollar != null) {
              //                   this.exceljson[i]['mrp_inr'] = this.exceljson[i]['mrp_dollar'] * this.goc_dollar
              //                 } else if (this.exceljson[i]['mrp_euro'] && this.goc_euro != null) {
              //                   this.exceljson[i]['mrp_inr'] = this.exceljson[i]['mrp_euro'] * this.goc_euro
              //                 } else if (this.exceljson[i]['mrp_aus_dollar'] && this.goc_aus_dollar != null) {
              //                   this.exceljson[i]['mrp_inr'] = this.exceljson[i]['mrp_aus_dollar'] * this.goc_aus_dollar
              //                 } else if (this.exceljson[i]['mrp_pound'] && this.goc_pound != null) {
              //                   this.exceljson[i]['mrp_inr'] = this.exceljson[i]['mrp_pound'] * this.goc_pound
              //                 } else {
              //                   this.exceljson[i]['mrp_inr'] = this.exceljson[i]['final_price']
              //                 }
              //               }
              // /* step 3 */this.exceljson[i]['discount_rs'] = this.exceljson[i]['mrp_inr'] - this.exceljson[i]['final_price']
              // /* step 4 */this.exceljson[i]['discount_per'] = this.exceljson[i]['discount_rs'] / this.exceljson[i]['mrp_inr'] * 100
              // /* step 5 */this.exceljson[i]['sale_price'] = this.exceljson[i]['sale_rate'] * this.exceljson[i]['weight'] / 1000
              // /* step 6 */this.exceljson[i]['sale_disc_inr'] = this.exceljson[i]['mrp_inr'] - this.exceljson[i]['sale_price']
              // /* step 7 */this.exceljson[i]['sale_disc_per'] = this.exceljson[i]['sale_disc_inr'] / this.exceljson[i]['mrp_inr'] * 100
              delete this.exceljson[i]['__EMPTY']
              delete this.exceljson[i]['__EMPTY_1']
              delete this.exceljson[i]['book_img1_1']
              delete this.exceljson[i]['book_img2_1']
              delete this.exceljson[i]['book_img3_1']
              delete this.exceljson[i]['book_img4_1']




/* step 8 */ if (this.exceljson[i]['categories'] == this.Allcategories[j]['category']) {
                this.exceljson[i]['categories'] = this.Allcategories[j]['_id']
              }
/*step 9 */  if (this.exceljson[i]['subcategory'] == this.Allcategories[j].subcategory[k]['name']) {
                this.exceljson[i]['subcategory'] = this.Allcategories[j].subcategory[k]['_id']
              }
            }
          }
        }
        this.step2()
        // this.exportexcel(this.exceljson)
      }, (error) => {
        throwError(error)
      }, () => {
        console.log('All Categories Fetch In Bulk Books Upload')
      }
    )
  }
  step2() {
    for (let i = 0; i < this.exceljson.length; i++) {
      for (let j = 0; j < this.Allcategories.length; j++) {
        for (let k = 0; k < this.Allcategories[j].subcategory.length; k++) {
          this.exceljson[i]['final_price'] = Math.floor(this.exceljson[i]['rate'] * this.exceljson[i]['weight'] / 1000)
        }
      }
    }
    this.step3()
  }
  step3() {
    for (let i = 0; i < this.exceljson.length; i++) {
      for (let j = 0; j < this.Allcategories.length; j++) {
        for (let k = 0; k < this.Allcategories[j].subcategory.length; k++) {
          if (this.exceljson[i]['mrp_dollar'] == null || this.exceljson[i]['mrp_euro'] == null || this.exceljson[i]['mrp_aus_dollar'] == null || this.exceljson[i]['mrp_pound'] == null) {
            if (this.exceljson[i]['mrp_dollar'] == '') {
              this.exceljson[i]['mrp_dollar'] = 0
            }
            if (this.exceljson[i]['mrp_euro'] == '') {
              this.exceljson[i]['mrp_euro'] = 0
            }
            if (this.exceljson[i]['mrp_aus_dollar'] == '') {
              this.exceljson[i]['mrp_aus_dollar'] = 0
            }
            if (this.exceljson[i]['mrp_pound'] == '') {
              this.exceljson[i]['mrp_pound'] = 0
            }


          }
          if (this.exceljson[i]['mrp_dollar'] != null || this.exceljson[i]['mrp_euro'] != null || this.exceljson[i]['mrp_aus_dollar'] != null || this.exceljson[i]['mrp_pound'] != null) {
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


        }
      }
    }
    this.step4()
  }
  step4() {
    for (let i = 0; i < this.exceljson.length; i++) {
      for (let j = 0; j < this.Allcategories.length; j++) {
        for (let k = 0; k < this.Allcategories[j].subcategory.length; k++) {
          this.exceljson[i]['discount_rs'] = this.exceljson[i]['mrp_inr'] - this.exceljson[i]['final_price']
        }
      }
    }
    this.step5()
  }
  step5() {
    for (let i = 0; i < this.exceljson.length; i++) {
      for (let j = 0; j < this.Allcategories.length; j++) {
        for (let k = 0; k < this.Allcategories[j].subcategory.length; k++) {
          this.exceljson[i]['discount_per'] = this.exceljson[i]['discount_rs'] / this.exceljson[i]['mrp_inr'] * 100
        }
      }
    }
    this.step6()
  }
  step6() {
    for (let i = 0; i < this.exceljson.length; i++) {
      for (let j = 0; j < this.Allcategories.length; j++) {
        for (let k = 0; k < this.Allcategories[j].subcategory.length; k++) {
          this.exceljson[i]['sale_price'] = this.exceljson[i]['sale_rate'] * this.exceljson[i]['weight'] / 1000
        }
      }
    }
    this.step7()
  }
  step7() {
    for (let i = 0; i < this.exceljson.length; i++) {
      for (let j = 0; j < this.Allcategories.length; j++) {
        for (let k = 0; k < this.Allcategories[j].subcategory.length; k++) {
          this.exceljson[i]['sale_disc_inr'] = this.exceljson[i]['mrp_inr'] - this.exceljson[i]['sale_price']
        }
      }
    }
    this.step8()
  }
  step8() {
    for (let i = 0; i < this.exceljson.length; i++) {
      for (let j = 0; j < this.Allcategories.length; j++) {
        for (let k = 0; k < this.Allcategories[j].subcategory.length; k++) {
          this.exceljson[i]['sale_disc_per'] = this.exceljson[i]['sale_disc_inr'] / this.exceljson[i]['mrp_inr'] * 100

          if (this.exceljson[i]['book_img1'] ||
            this.exceljson[i]['book_img2'] ||
            this.exceljson[i]['book_img3'] ||
            this.exceljson[i]['book_img4']) {
            var book_img1 = this.exceljson[i]['book_img1']
            var book_img2 = this.exceljson[i]['book_img2']
            var book_img3 = this.exceljson[i]['book_img3']
            var book_img4 = this.exceljson[i]['book_img4']
            this.exceljson[i]['book_img'] = [
              'https://images-bbw.booksbyweight.com/' + book_img1,
              'https://images-bbw.booksbyweight.com/' + book_img2,
              'https://images-bbw.booksbyweight.com/' + book_img3,
              'https://images-bbw.booksbyweight.com/' + book_img4
            ]
          }
          delete this.exceljson[i]['book_img1']
          delete this.exceljson[i]['book_img2']
          delete this.exceljson[i]['book_img3']
          delete this.exceljson[i]['book_img4']
          // if (this.exceljson[i]['book_img1'] != '' ||
          //   this.exceljson[i]['book_img2'] != '' ||
          //   this.exceljson[i]['book_img3'] != '' ||
          //   this.exceljson[i]['book_img4'] != '') {
          //   this.exceljson[i]['book_img'] = [
          //     this.exceljson[i]['book_img1'] = 'https://booksimg.s3.us-east-2.amazonaws.com/' + this.exceljson[i]['book_img1'],
          //     this.exceljson[i]['book_img2'] = 'https://booksimg.s3.us-east-2.amazonaws.com/' + this.exceljson[i]['book_img2'],
          //     this.exceljson[i]['book_img3'] = 'https://booksimg.s3.us-east-2.amazonaws.com/' + this.exceljson[i]['book_img3'],
          //     this.exceljson[i]['book_img4'] = 'https://booksimg.s3.us-east-2.amazonaws.com/' + this.exceljson[i]['book_img4']
          //   ]
          // }

        }
      }
    }
    console.log(this.exceljson)
    this.exportexcel(this.exceljson)
  }
  exportexcel(exceljson) {
    var date = new Date().toISOString();
    // var name =
    //   ("00" + (date.getMonth() + 1)).slice(-2)
    //   + "/" + ("00" + date.getDate()).slice(-2)
    //   + "/" + date.getFullYear() + " "
    //   + ("00" + date.getHours()).slice(-2) + ":"
    //   + ("00" + date.getMinutes()).slice(-2)
    //   + ":" + ("00" + date.getSeconds()).slice(-2);
    let filename = date + "BooksByWeight"
    this.jsonexport.exportjson(exceljson, filename)
    // this.excelexp.exportExcel(exceljson, filename);
  }

  progress = 0;
  messages = '';

  fileInfos: Observable<any>;
  addbulk(event) {
  
    try {
      this.spinner.show()
      if (!this.validateJsonFile(event.target.files[0].name)) {
        throw { type: "please upload Json file" };
      } else if (event.target.files.length !== 1) {
        throw { multiple: "Cannot use multiple files" };
      } else {
        this.excel = event.target.files[0]
        const form = new FormData()
        form.append('excel_file',
          this.excel)
        this.bulkbook.bulkbook(form).subscribe(
          
          event => {

            console.log(event)
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.spinner.hide()
              this.message = event.body.Message;
              Swal.fire({
                title: `Books ${this.message} SuccessFully?`,
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Done'
              }).then((result) => {
                if (result.value) {
                  this.ngZone.run(() => this.router.navigate(['/admin/dashboard/view-products'])).then();
                }
              })
            }
          },
          err => {
            this.spinner.hide()
            console.log(err)
            this.messages = err.error.error.message
            this.progress = 0;
            this.excel = null
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: this.messages,
            })
            // this.messages = 'Could not upload the file!';
    
          }
        )
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
   
    // (data) => {
    //   if (data) {
    //     Swal.fire({
    //       title: 'Books Uploaded SuccessFully?',
    //       icon: 'success',
    //       showCancelButton: false,
    //       confirmButtonColor: '#3085d6',
    //       confirmButtonText: 'Done'
    //     }).then((result) => {
    //       if (result.value) {
    //         this.ngZone.run(() => this.router.navigate(['/admin/dashboard/view-products'])).then();
    //       }
    //     })
    //   } else {
    //     Swal.fire({
    //       title: 'Books Uploading failed?',
    //       icon: 'error',
    //     })
    //   }
    // }
  }

  validateJsonFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'json') {
      return true;
    } else if (ext.toLowerCase() == 'json') {
      return true;
    }
    else {
      return false;
    }
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
  ExportToExcel(){
    this.bulkbook.Exportexcel().subscribe((data)=>{
     this.exportexcels(data.books)
      console.log(data)
    },(error)=>{
      console.log(error)
    })
  }
  exportexcels(exceljson) {
    var date = new Date().toISOString();
    // var name =
    //   ("00" + (date.getMonth() + 1)).slice(-2)
    //   + "/" + ("00" + date.getDate()).slice(-2)
    //   + "/" + date.getFullYear() + " "
    //   + ("00" + date.getHours()).slice(-2) + ":"
    //   + ("00" + date.getMinutes()).slice(-2)
    //   + ":" + ("00" + date.getSeconds()).slice(-2);
    let filename = date + "BooksByWeight"
    this.excelexp.exportExcel(exceljson, filename)
    // this.excelexp.exportExcel(exceljson, filename);
  }
}
