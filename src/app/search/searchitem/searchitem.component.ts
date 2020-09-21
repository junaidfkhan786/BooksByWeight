import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterService } from 'src/app/services/filter.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-searchitem',
  templateUrl: './searchitem.component.html',
  styleUrls: ['./searchitem.component.css']
})
export class SearchitemComponent implements OnInit {

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

}