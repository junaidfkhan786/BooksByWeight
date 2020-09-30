import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersService } from 'src/app/services/orders.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf'
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  address: any = {}
  orderdate: any
  order_items: any = []
  shippingid: any
  paymentid: any
  paymentmethod: boolean
  orderdetail: any
  orderid: any;
  i: number
  amount: number
coupon_code:any
coupon_amount:any
coupon_percentage:any
total:any
  constructor(
    private order: OrdersService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    window.scroll(0,0)
    this.spinner.show()
    this.loadorderdetails();
  }

  loadorderdetails() {
    this.order.GetOrderById(this.route.snapshot.params._id).subscribe(
      (res) => {
        if (res) {
          this.orderdetail = res
          console.log(this.orderdetail);
          let orders: any = this.orderdetail[0].order_items
          this.orderdetail[0]['total_amount'] = 0
          for (var i = 0; i < orders.length; i++) {
            delete orders[i]['_id']
            if (orders[i].bookdetail) {
              orders[i].bookdetail['name'] = orders[i].bookdetail['book_name']
              delete orders[i].bookdetail['book_name']
              delete orders[i].bookdetail['id']
              delete orders[i].bookdetail['_id']
              orders[i].bookdetail['units'] = Math.floor(orders[i]['units'])
              delete orders[i]['units']
              orders[i]['name'] = orders[i].bookdetail['name']
              orders[i]['selling_price'] = Math.floor(orders[i].bookdetail['final_price'])
              orders[i]['sku'] = orders[i].bookdetail['sku']
              orders[i]['units'] = Math.floor(orders[i].bookdetail['units'])
              orders[i]['weight'] = Math.floor(orders[i].bookdetail['weight'])
              orders[i]['total_price'] = orders[i].units * orders[i].selling_price
              this.orderdetail[0]['total_amount'] += +orders[i].selling_price
              delete orders[i].bookdetail['name']
              delete orders[i].bookdetail['final_price']
              delete orders[i].bookdetail['sku']
              delete orders[i].bookdetail['units']
              delete orders[i].bookdetail['weight']
              delete orders[i]['bookdetail']
            }
          }

          this.address = this.orderdetail[0].address
          this.orderdate = this.orderdetail[0].orderDate
          this.order_items = this.orderdetail[0].order_items
          this.shippingid = this.orderdetail[0].shippingid
          this.paymentid = this.orderdetail[0].paymentid
          this.orderid = this.orderdetail[0].orderid
          this.paymentmethod = this.orderdetail[0].isPaymentCompleted
          this.amount = this.orderdetail[0].amount
         if(this.orderdetail[0].coupon_code != null){
          this.coupon_code = this.orderdetail[0].coupon_code.coupon_code
          this.coupon_amount = this.orderdetail[0].coupon_code.coupon_amount
          this.coupon_percentage = this.orderdetail[0].coupon_code.percentage
          this.total = this.orderdetail[0].total_amount}
          // console.log(this.coupon_code,this.coupon_amount,this.coupon_percentage);

          this.spinner.hide();
          setTimeout(() => {
            this.generatePDF();
          }, 4000);
        }
      }
    );
  }
  pdfAttachment: File;
  generatePDF() {


    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 200;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)
      pdf.save(this.orderid + '.pdf')
      var newName = this.orderid
      this.pdfAttachment = new File([pdf.output('blob')], newName, {
        type: pdf.output('blob').type,
      });

      console.log(this.pdfAttachment)
      // this.spinner.hide();
    });
  }
}
