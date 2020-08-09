import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-popularitem',
  templateUrl: './popularitem.component.html',
  styleUrls: ['./popularitem.component.css']
})
export class PopularitemComponent implements OnInit {
  @Input() popularitem: any;

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
