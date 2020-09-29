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
abouts = 'assets/policies/AboutUs.pdf'
Payments = 'assets/policies/Payments.pdf'
PrivacyPolicy = 'assets/policies/PrivacyPolicy.pdf'
Returns = 'assets/policies/Returs&Refunds.pdf'
Shippings = 'assets/policies/Shipping.pdf'
terms = 'assets/policies/Terms&Conditions.pdf'
copy = 'assets/policies/CopyrightPolicy.pdf'
about(){
  window.open(this.abouts);
}
Terms(){
  window.open(this.terms);
}
Return(){
  window.open(this.Returns);
}
Shipping(){
  window.open(this.Shippings);
}
Copyright(){
  window.open(this.copy);
}
Privacy(){
  window.open(this.PrivacyPolicy);
}
Payment(){
  window.open(this.Payments);
}
}
