import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { FilterService } from 'src/app/services/filter.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: any;
  bookimg: any[] = [];
  @Input() addedToWishlist: boolean;
  @Input() cartbutton:boolean;
img:any = []
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
books: any = [];
book$: any = [];
cartitem: any = [];
book1 :any =[];
cartquantity:any =[];
cartquantity1:any =[];

  constructor(
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,
    private router: Router,

    private wish: WishlistService,
    private cart : CartService,

  ) { }

  ngOnInit() {
this.loadimg()
  }

  
  loadimg() {
    this.bookimg = this.productItem.book_img

    
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
    this.productItem['book_img'] = this.bookimg

  }

  productHome(_id) {
    this.router.navigate(['details/' + _id]);
  }



  addWish(_id) {
    this.spinner.show();
    if (localStorage.getItem('User')) {
      this.wish.postProduct(_id).subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('Product Successfully Added', 'BooksByWeight', {
            timeOut: 1000,
          });

          this.addedToWishlist = true;
         
        },
        (err) => {
          this.spinner.hide();
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
    this.spinner.show();
    this.wish.deleteProduct(WishlistId).subscribe(() => {
      this.spinner.hide();
      this.toastr.error('Product Has Been Remove', 'BooksByWeight', {
        timeOut: 1000,
      });
      this.addedToWishlist = false;
     

    
    });
  }

  addCart(_id,selling_price,weight){
    this.spinner.show();
    if (localStorage.getItem('User')!=null) {
    this.cart.postProduct(_id,selling_price,weight).subscribe(() =>{
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
  
}
