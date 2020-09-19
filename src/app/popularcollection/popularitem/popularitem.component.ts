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
    this.loadimg()
  }
 
  productHome(_id) {
    this.router.navigate(['details/' + _id]);
  }

  bookimg:any=[]
  img:any = []
    loadimg() {
      this.bookimg = this.popularitem.book_img
  
      
  //  var img:any = []
      for (let i = 0; i < this.bookimg.length; i++) {
        this.img.push(this.bookimg[i].toUpperCase())
     
        // if (this.bookimg[i] == "https://booksimg.s3.us-east-2.amazonaws.com/") {
        //   this.bookimg.splice(i, 1); i--;
        // }
      }
      for (let i = 0; i < this.img.length; i++) {
      
   
        if (this.img[i] == "HTTPS://BOOKSIMG.S3.US-EAST-2.AMAZONAWS.COM/") {
          this.img.splice(i, 1); i--;
        }
      }
      this.bookimg.splice(0,this.bookimg.length)
      this.bookimg = this.img
      this.popularitem['book_img'] = this.bookimg
  
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
