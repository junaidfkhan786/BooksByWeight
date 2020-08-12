import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(
    public spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    
  }

  opened:any

  receave($event){
    this.opened = $event;

  }

}
