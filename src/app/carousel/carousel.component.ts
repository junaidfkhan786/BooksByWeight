import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map } from 'rxjs/operators';
import { BooksService } from '../services/books.service';
declare var $: any;
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,

    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navSpeed: 100,
    autoHeight: false,
    navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: false
  }

  books: any = []
  p: any
  book1: any
  book2: any
  book3:any
  constructor(
    private bookservice: BooksService,
    private router: Router
  ) { }

  ngOnInit() {
    this.jquery_code();
    // this.getrandombookpage()
    this.GetBannerBooks()
  }

  jquery_code() {


    $(document).ready(function () {


    });

  }
  // randomNumber(min, max) {
  //   return Math.floor(Math.random() * (max - min) + min);
  // }
  // getrandombookpage() {

  //   this.bookservice.getBooks(1).subscribe((pages) => {
  //     var page = pages.pages
  //     this.p = this.randomNumber(1, page)
  //     console.log(this.p)
  //     this.getbooks(this.p)
  //   })

  // }
  // getbooks(p) {
  //   this.bookservice.getBooks(p).pipe(
  //     map((resp) => {
  //       var book = resp.books
  //       for (let i = 0; i < book.length; i++) {
  //         book[i]['mrp_inr'] = Math.floor(book[i]['mrp_inr'])
  //         book[i]['rate'] = Math.floor(book[i]['rate'])
  //         book[i]['weight'] = Math.floor(book[i]['weight'])
  //         book[i]['sale_disc_inr'] = Math.floor(book[i]['sale_disc_inr'])
  //         book[i]['sale_disc_per'] = Math.floor(book[i]['sale_disc_per'])
  //         book[i]['discount_per'] = Math.floor(book[i]['discount_per'])
  //         book[i]['discount_rs'] = Math.floor(book[i]['discount_rs'])
  //         book[i]['final_price'] = Math.floor(book[i]['final_price'])
  //         book[i]['sale_rate'] = Math.floor(book[i]['sale_rate'])
  //         book[i]['sale_price'] = Math.floor(book[i]['sale_price'])
  //         book[0]['sale_price'] = 0
  //       }
  //       return resp
  //     })
  //   ).subscribe((data) => {
  //     this.books = data.books;

  //     let num1:any = this.randomNumber(0,this.books.length - 1)
  //     let num2:any = this.randomNumber(0,this.books.length - 1)
  //     this.book1 = this.books[num1]
  //     this.book2 = this.books[num2]
  //     console.log(this.book1,this.book2)
  //   });
  // }

  GetBannerBooks() {
    this.bookservice.getBannerBooks().subscribe((books)=>{
      console.log(books)
      if(books.success == true){
        this.book1 = books.newbook[0]
        this.book2 = books.preowned[0]
        this.book3 = books.collectibles[0]
      }
    })
  }
  productHome(_id) {
    this.router.navigate(['details/' + _id]);
  }

}
