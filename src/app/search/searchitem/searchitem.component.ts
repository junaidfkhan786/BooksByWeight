import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterService } from 'src/app/services/filter.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-searchitem',
  templateUrl: './searchitem.component.html',
  styleUrls: ['./searchitem.component.css']
})
export class SearchitemComponent implements OnInit {
  @Input() cartbutton:boolean;
  @Input() searchItem: any;

  @Input() addedToWishlist: boolean;

  wish$: any = [];
  wid: any = [];
  size: any = {};
  Error = false;
  message: any;
  length: any;
  wid1: any = [];
  pid: any = [];
  pid1: any = [];
w:any = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private filter: FilterService,
    private wish: WishlistService,
    private cart : CartService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

  }


  productHome(_id) {
    this.router.navigate(['details/' + _id]);
  }

  gotocart(){
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
          window.scrollTo(0, 10);

      }
    })

  }

  addWish(_id) {
    if (localStorage.getItem('User')) {
      this.wish.postProduct(_id).subscribe(
        () => {
          this.toastr.success('Product Successfully Added', 'BooksByWeight', {
            timeOut: 1000,
          });

          this.addedToWishlist = true;

        },
        (err) => {
          this.toastr.warning('Product already Added', 'BooksByWeight', {
            timeOut: 1000,
          });
        }
      );
    } else {
      this.router.navigate(['/login']);
      this.toastr.error('YOU NEED TO LOGIN TO SAVE WISHLIST', 'BooksByWeight', {
        timeOut: 1000,
      });
    }
  }

  deletePro(WishlistId) {
    this.wish.deleteProduct(WishlistId).subscribe(() => {
      this.toastr.error('Product Has Been Remove', 'BooksByWeight', {
        timeOut: 1000,
      });
      this.addedToWishlist = false;



    });
  }

  addCart(details,_id,selling_price,weight){
  this.spinner.show()
    if (localStorage.getItem('User')!=null) {
      if(details.sale_price !=0 && details.sale_price !=null  ){
        selling_price = details.sale_price
      }
    this.cart.postProduct(_id,selling_price,weight).subscribe(() =>{

      this.toastr.success('Product Successfully Added to cart', 'BooksByWeight', {
        timeOut: 1000,

      });
      this.spinner.hide();
    })
  } else {
    this.router.navigate(['/login']);
    this.toastr.error('YOU NEED TO LOGIN TO INSERT BOOKS IN CART', 'BooksByWeight', {
      timeOut: 1000,
    });
  }


  }
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
}
