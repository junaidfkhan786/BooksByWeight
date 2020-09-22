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
  constructor(
    private order: OrdersService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.spinner.show()
    this.loadorderdetails();
  }

  loadorderdetails() {
    this.order.GetOrderById(this.route.snapshot.params._id).subscribe(
      (res) => {
       if(res){
        this.orderdetail = res
        console.log(this.orderdetail);
        let orders: any = this.orderdetail[0].order_items
        for (var i = 0; i < orders.length; i++) {
          delete orders[i]['_id']
          if (orders[i].bookdetail) {
            orders[i].bookdetail['name'] = orders[i].bookdetail['book_name']
            delete orders[i].bookdetail['book_name']
            delete orders[i].bookdetail['id']
            delete orders[i].bookdetail['_id']
            orders[i].bookdetail['units'] = orders[i]['units']
            delete orders[i]['units']
            orders[i]['name'] = orders[i].bookdetail['name']
            orders[i]['selling_price'] = orders[i].bookdetail['selling_price']
            orders[i]['sku'] = orders[i].bookdetail['sku']
            orders[i]['units'] = orders[i].bookdetail['units']
            orders[i]['weight'] = orders[i].bookdetail['weight']
            delete orders[i].bookdetail['name']
            delete orders[i].bookdetail['selling_price']
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
        console.log(this.order_items);
        this.spinner.hide();
        // setTimeout(() => {
        //   this.generatePDF();
        // }, 3000);
       }
      }
    );
  }

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
      var p = pdf.output()
      var file = new Blob([p],{type:'application/pdf'})
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL); 
      // pdf.save(this.orderid + '.pdf'); // Generated PDF
      this.spinner.hide();
    });
  }
}
