import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { FilterService } from 'src/app/services/filter.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-prebookitems',
  templateUrl: './prebookitems.component.html',
  styleUrls: ['./prebookitems.component.css']
})
export class PrebookitemsComponent implements OnInit {
  @Input() productItem: any;

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
    private CatService: CategoryService,
    private router: Router,
    private newService: BooksService,
    private route: ActivatedRoute,
    private filter: FilterService,
    private wish: WishlistService,
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
