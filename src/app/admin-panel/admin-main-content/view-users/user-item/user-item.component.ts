import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
@Input() useritem:any
button:boolean;
  constructor() { }

  ngOnInit(): void {
    this.button = true
  }
  block(useritem){

    console.log(useritem)
    this.button = !this.button
  }
}
