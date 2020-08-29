import { BooksService } from './../services/books.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
declare var $: any;
@Component({
  selector: 'app-latestcollection',
  templateUrl: './latestcollection.component.html',
  styleUrls: ['./latestcollection.component.css'],
})
export class LatestcollectionComponent implements OnInit {
  books$: any = [];
  wish$: any = [];
  wid: any = [];
  wid1: any = [];
  spinner : boolean = true;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: [
      "<i class='fas fa-angle-left'></i>",
      "<i class='fas fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
    },
    nav: false,
  };

  constructor(
    private newService: BooksService,
    private wish: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadbook();

if(localStorage.getItem('User') !=null){
  this.wish.getwishlistload().subscribe(() => {
    this.loadwish();
  })

  this.loadwish();
}
  

    
    this.jquery_code();
  }

  jquery_code() {
    $(document).ready(function () {});
  }

  loadbook() {
    this.newService.getlatestBooks().subscribe((data) => {

      this.books$ = data;
      this.spinner = false
      
  });

  }

  loadwish() {
    this.wish.getwish().subscribe((data) => {
      this.wish$ = data;

      const size = this.wish$.books;

      for (var { book: books } of size) {
        this.wid = books;

        const size1 = books._id;

        this.wid1.push(size1);
      }
      for (let w of this.wid1) {
      }
    });
  }
}
