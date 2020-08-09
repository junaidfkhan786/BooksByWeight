import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {


  constructor() { }
opened :boolean;

@Output() openedevent = new EventEmitter<boolean>()
  ngOnInit(): void {

    

  }

  togglesidebar(){

   this.openedevent.emit(this.opened = !this.opened) 

  
  }

}
