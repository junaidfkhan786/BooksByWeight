import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

this.jquery_code();
}

jquery_code(){

 $(document).ready(function(){
//   $(window).scroll(function() {

//     if ($(this).scrollTop()>0)
//      {
//         $('.footer').fadeOut();
//      }
//     else
//      {
//       $('.footer').fadeIn();
//      }
//  });


});
}

}
