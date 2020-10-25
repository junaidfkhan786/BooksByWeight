import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private token: OrdersService
  ) { }

  ngOnInit(): void {
  this.loadtoken();
  }

  loadtoken(){
    var Ship_Rocket_Token = localStorage.getItem('shiptoken')
    if(!Ship_Rocket_Token){
      this.token.getshiprockettoken().subscribe((token)=>{
        console.log(token)
        localStorage.setItem('shiptoken',token.token)
      },(error)=>{
        console.log(error)
      })
  
    }
    
  }

}
