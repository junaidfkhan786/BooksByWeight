import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router
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
}
