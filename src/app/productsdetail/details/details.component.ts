import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { ToastrService } from 'ngx-toastr';
declare let $: any;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit ,AfterViewInit {
  @Input() details: any;

  @Input() addedToWishlist: boolean;
bookimg :any [] = [];
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private newService: BooksService,
    private route: ActivatedRoute,
    private wish: WishlistService
  ) {}

  ngOnInit() {
    this.loadimg();
  }

  ngAfterViewInit() {

    setInterval(() =>{
 this.loadslick();
    },1000)
   
  }

  loadslick(){
       // Product Main img Slick
       $('#product-main-img').slick({
        infinite: true,
        speed: 300,
        dots: false,
        arrows: false,
        fade: true,
        asNavFor: '#product-imgs',
      });
  
      // Product imgs Slick
      $('#product-imgs').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
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
        },
        ]
      });
  
  }
loadimg(){
  this.bookimg = this.details.book_img

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

}
