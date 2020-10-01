import { Component, OnInit, Input, AfterViewInit, Pipe, NgZone } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { map, take } from 'rxjs/operators';
declare let $: any;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  @Input() details: any;
  @Input() addedToWishlist: boolean;
  @Input() cartbutton: boolean;
  bookimg: any[] = [];
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private newService: BooksService,
    private route: ActivatedRoute,
    private wish: WishlistService,
    private cart: CartService,
    private spinner: NgxSpinnerService,
    private book: BooksService,
    private ngZone: NgZone,

  ) { }
  selected: any;
  conditions: any = []
  ngOnInit() {
    // this.loadbook();
    this.loadimg();
  }
delimg(event){
  var currentimage:any = event.originalTarget.currentSrc
  console.log(event.originalTarget.currentSrc)
  for (let i = 0; i < this.bookimg.length; i++) {

    if (this.bookimg[i] == currentimage) {
      this.bookimg.splice(i, 1); i--;
    }
  }
}
jequery_code(){
  $(window).on("load", function(){
    $('[data-toggle="tooltip"]').tooltip().mouseover();
    setTimeout(function(){ $('[data-toggle="tooltip"]').tooltip('hide'); }, 3000);
});
}


  ngAfterViewInit() {
    setTimeout(() => {
      // Product Main img Slick
      $('#product-main-img').slick({
        draggable: false,
        infinite: true,
        speed: 300,
        dots: false,
        arrows: false,
        fade: true,
        adaptiveHeight:false,
        asNavFor: '#product-imgs',
      });
      // $('#product-imgs').match_height().parent('#product-imgs').slick({
      //   vertical:true
      // });
      // Product imgs Slick
      $('#product-imgs').slick({
        adaptiveHeight:false,
        mobileFirst: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: 0,
        vertical: true,
        asNavFor: '#product-main-img',
        responsive: [{
          breakpoint: 991,
          settings: {
            vertical: true,
            arrows: false,
            dots: false,
          }
        }
        ]
      });
      this.spinner.hide();

    }, 2000);

  }
  bookchange(id){
    window.location.assign('details/' + id)
    // this.router.navigate(['details/' + id]);
  }
  // loadbook() {

  //   this.book.getBooks().pipe(
  //     map((resp) => {
  //       var samebook: any = []
  //       var book = resp.books
  //       for (let i = 0; i < book.length; i++) {

  //         if (book[i].Isbn_no == this.details.Isbn_no) {
  //           samebook.push(book[i])
  //         }

  //       }
  //       return samebook
  //     })
  //   ).subscribe((data) => {

  //     this.conditions = data
  //     this.spinner.hide();
  //   })

  // }
notify(){
  Swal.fire(
    'Sorry This Book Is Book Is Out Of Stock!',
    'Try Again After SomeTimes',
    'success'
  )
  // Swal.fire({
  //   title: 'Want To Get Notified When Book Is Available?',
  //   text: '',
  //   icon: 'info',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, Click Here!',
  //   cancelButtonText: 'No, Your Wish!'
  // }).then((result) => {
  //   if (result.value) {
  //     this.ngZone.run(
  //       () => this.router.navigate(['/books'])
  //     ).then();
  //     Swal.fire(
  //       'Wait For Email!',
  //       'An Email Has Been Sent When Book is Available',
  //       'success'
  //     )
  //   }
  // })

}
  loadimg() {
    this.bookimg = this.details.book_img
    var img: any = []
    for (let i = 0; i < this.bookimg.length; i++) {

      if (this.bookimg[i] == "https://booksimg.s3.us-east-2.amazonaws.com/") {
        this.bookimg.splice(i, 1); i--;
      }
    }
    // for (let i = 0; i < img.length; i++) {


    //   if (img[i] == "HTTPS://BOOKSIMG.S3.US-EAST-2.AMAZONAWS.COM/") {
    //     img.splice(i, 1); i--;
    //   }
    // }
    // this.bookimg.splice(0, this.bookimg.length)
    // this.bookimg = img
    // console.log(this.bookimg)

  }
  copygoogle(){
   var a:string = window.location.href
   console.log(a)
   let selBox = document.createElement('textarea');
   selBox.style.position = 'fixed';
   selBox.style.left = '0';
   selBox.style.top = '0';
   selBox.style.opacity = '0';
   selBox.value = a;
   document.body.appendChild(selBox);
   selBox.focus();
   selBox.select();
   document.execCommand('copy');
   document.body.removeChild(selBox);
   alert(
    'Link Copied!'+ ' ' +
    'You Can Share It With Your Friend!'
  )
  window.open('https://mail.google.com')
  }
  copyinsta(){
    var a:string = window.location.href
    console.log(a)
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = a;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    alert(
      'Link Copied!'+ ' ' +
      'You Can Share It With Your Friend!'
    )
    window.open('https://www.instagram.com')
   }
   copyfacebook(){
    var a:string = window.location.href
    console.log(a)
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = a;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    alert(
      'Link Copied!'+ ' ' +
      'You Can Share It With Your Friend!'
    )
    window.open('https://www.facebook.com')
   }
   copytwitter(){
    var a:string = window.location.href
    console.log(a)
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = a;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    alert(
      'Link Copied!'+ ' ' +
      'You Can Share It With Your Friend!'
    )
    window.open('https://twitter.com')
   }

  addWish(_id) {
    if (localStorage.getItem('User')) {
      this.wish.postProduct(_id).subscribe(
        () => {
          this.toastr.success('Product Successfully Added', 'BooksByWeight', {
            timeOut: 3000,
          });

          this.addedToWishlist = true;

        },
        (err) => {
          this.toastr.warning('Product already Added', 'BooksByWeight', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.router.navigate(['/login']);
      this.toastr.error('YOU NEED TO LOGIN TO SAVE WISHLIST', 'BooksByWeight', {
        timeOut: 3000,
      });
    }
  }

  deletePro(WishlistId) {
    this.wish.deleteProduct(WishlistId).subscribe(() => {
      this.toastr.error('Product Has Been Remove', 'BooksByWeight', {
        timeOut: 2000,
      });
      this.addedToWishlist = false;


    });
  }
  addCart(details,_id, selling_price, weight) {


    this.spinner.show();
    if (localStorage.getItem('User') != null) {
      if(details.sale_price !=0 && details.sale_price !=null  ){
        selling_price = details.sale_price
      }
      this.cart.postProduct(_id, selling_price, weight).subscribe(() => {
        this.spinner.hide();
        this.cartbutton = true
        this.toastr.success('Product Successfully Added to cart', 'BooksByWeight', {
          timeOut: 1000,
        });

      })
    } else {
      this.router.navigate(['/login']);
      this.toastr.error('YOU NEED TO LOGIN TO INSERT BOOKS IN CART', 'BooksByWeight', {
        timeOut: 1000,
      });
    }



  }
  gotoauthorsearch(authorname){
    var _id = authorname + "&author_name=1";
    this.router.navigate(['search/'+ _id]);
  }
  gotopublishersearch(publishername){
    var _id = publishername + "&publisher=1";
    this.router.navigate(['search/'+ _id]);
  }
  gotocart() {

    Swal.fire({
      title: 'Already Added?',
      text: "If You Want To Increase Quantity Of Your Book!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Click Here To Goto Cart!'
    }).then((result) => {
      if (result.value) {
        window.location.assign('/cart')
      }
    })

  }

}
