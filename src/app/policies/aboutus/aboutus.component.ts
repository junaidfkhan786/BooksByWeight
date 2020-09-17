import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private order:OrdersService,
    private spinner:NgxSpinnerService
  ) { }
  

  ngOnInit() {


  }




}
