import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  @Input() productItem: any;
  decre: number;
  incre:number;
  book$:any = [];
  cartitem :any = [];
  cartitem1 :any = [];
  price:any;
  subtotal:any;
total:any [];
cartitem2:any= [];
weight:any;
weight2:any= [];
cartitem4:any =[];
c:any = [];
cartitem5:any;
constructor(
    private cart:CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    let cartitem6 = this.cartitem2
    for(let user of cartitem6){
      console.log(user.weight)
    }
 this.loadcart();
 console.log(this.cartitem4)    
this.jquery_code();
  }



  jquery_code(){
    $(document).ready(function () { 

     });
  }

  loadcart(){
    this.cart.getCart().subscribe(data => {

      this.book$ = data;
      this.subtotal = this.book$.subtotal
    
//     const cartitem = this.book$.cartItems[0].cart;
   
//     for (var { total: prices } of cartitem) {
//       this.price = prices;
//       this.total.push(this.price)


//       // for (var i=0; i<=this.total.length; i++){
//       //   this.total1 += +this.total[i];
//       // }

//     }
//     let sum = 0;

//       for (let num of this.total){
      
//          sum = sum + num
      
//       }
         
// this.total1 = sum;
// console.log(this.total1)

    
  const cartitem = this.book$.cartItems[0].cart;



 for (var { book: books } of cartitem) {
  
  this.cartitem1 = books
  this.cartitem2.push(this.cartitem1)  
 } 

 const cartitem3 = this.cartitem2



  for (var i = 0; i <= cartitem3.length; i++) {
    this.c = cartitem3[i].weight;
    this.cartitem4.push(this.c)
    let sum = 0;

    for (let r of this.cartitem4){
    
       sum = sum + r
   
    }
    this.cartitem5 = sum
  

  }
  let cartitem6 = this.cartitem2
  console.log(cartitem6)
  
 
//     for (var { weigth: weight1 } of cartitem3) {
//       this.weight = weight1;
//       this.weight2.push(this.weight)

//     }

// console.log(this.weight2)
   
//     for (var { total: prices } of cartitem) {
//       this.price = prices;
//       this.total.push(this.price)


//       // for (var i=0; i<=this.total.length; i++){
//       //   this.total1 += +this.total[i];
//       // }

//     }
//     let sum = 0;

//       for (let num of this.total){
      
//          sum = sum + num
      
//       }
         
// this.total1 = sum;
// console.log(this.total1)

    })
  }

  delCart(_id){
    this.cart.deleteProduct(_id).subscribe(()=>{
      this.toastr.error('Product Has Been Remove', 'BooksByWeight', {
        timeOut: 1000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
  }

  counterValue: number = 1;
  increment(counterValue,_id,total) {
    if (localStorage.getItem('User')!=null) {
    this.counterValue++;
    this.cart.updateqty(counterValue,_id,total).subscribe( () => {
      this.toastr.success('Product Has Been updated', 'BooksByWeight', {
        timeOut: 1000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    })

  }
  
    console.log(_id)
    console.log(total)    
    console.log(this.counterValue)
  }
  
  decrement(counterValue,_id,total) {
    if (localStorage.getItem('User')!=null) {
    this.counterValue--;
    this.cart.updateqty(counterValue,_id,total).subscribe( () => {
      this.toastr.success('Product Has Been updated', 'BooksByWeight', {
        timeOut: 1000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    })
  }
    console.log(_id)
    console.log(total)
    console.log(this.counterValue)
  }

}
