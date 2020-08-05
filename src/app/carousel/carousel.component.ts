import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $:any;
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
autoplayTimeout:3000,
autoplayHoverPause:true,
    navSpeed: 700,
    navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
    responsive: {
      0: {
        items: 1 
      },
      
    },
    nav: false
  }
  constructor() { }

  ngOnInit() {
this.jquery_code();

  }

  jquery_code(){


  $(document).ready(function(){

    
});

  }


}
