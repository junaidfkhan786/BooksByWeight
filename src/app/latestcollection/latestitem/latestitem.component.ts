import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-latestitem',
  templateUrl: './latestitem.component.html',
  styleUrls: ['./latestitem.component.css']
})
export class LatestitemComponent implements OnInit {
  @Input() latestitem: any;

  @Input() addedToWishlist: boolean;

  constructor(
    private toastr: ToastrService,
    private wish: WishlistService,
    private router: Router,
    private cart : CartService
  ) { }

  ngOnInit(): void {
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
          console.log(this.addedToWishlist)
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
      console.log(this.addedToWishlist)

    
    });
  }

  addCart(_id,selling_price,weight){
    if (localStorage.getItem('User')!=null) {
  
    this.cart.postProduct(_id,selling_price,weight).subscribe(() =>{
  
      this.toastr.success('Product Successfully Added to cart', 'BooksByWeight', {
        timeOut: 1000,
      
      });
    })
  }
  
  
  }
}
