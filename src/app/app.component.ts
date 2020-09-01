import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import * as AOS from 'aos';
import { BooksService } from './services/books.service';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
constructor(
  public spinner: NgxSpinnerService,
  ){}

  title = 'BooksByWeight';
  ngOnInit(): void {

this.jquery_code();

  }
  jquery_code(){

    $(document).ready(function(){
      AOS.init();
     
      var btn = $('#buttonarrow');
      
        $(window).scroll(function() {
          if ($(window).scrollTop() > 500) {
            btn.show();
          } else {
            btn.hide();
          }
        });
      
        btn.on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({scrollTop:0}, '300');
        });

    });
  }
  
}
