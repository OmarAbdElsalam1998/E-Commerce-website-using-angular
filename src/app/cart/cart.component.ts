import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  title="Market Cart";
  public Cartproducts:any;
  totalPrice:any;
  
  constructor(private titleService:Title,private router:Router,private CartSER:CartService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.CartSER.getCartProducts().subscribe(res=>{
       this.Cartproducts=res;
    });
  }
  // getCartProducts(){
  //  if("cart" in localStorage)
  //   {
  //    this.Cartproducts=JSON.parse(localStorage.getItem("cart")!);
  //   }
  //   console.log(this.Cartproducts)
  // }
  
  deleteItemFromCart(id:number){
    this.CartSER.DeleteItemFromCart(id);
    this.CartSER.getCartProducts().subscribe(res=>{
      this.Cartproducts=res;
   });
  }
removeItem(item:any){ 
this.CartSER.removeCartData(item);
}
emptyCart(){
  this.CartSER.removeAllCart();
}

goToPaymentPage(){
  this.router.navigate(['/cart/payment']);
}
increaseProductCounter(count:BehaviorSubject<number>){
count.value+1;
console.log(count);
}
deceaseProductCounter(count:number){
  
}
}
