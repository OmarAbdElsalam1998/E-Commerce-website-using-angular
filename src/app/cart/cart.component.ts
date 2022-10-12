import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  title="Market Cart";
  public Cartproducts:any=[];
  
  constructor(private titleService:Title,private router:Router,private CartSER:CartService) { }

  ngOnInit(): void {
   this.getCartProducts(); 

  }
  getCartProducts(){
   if("cart" in localStorage)
    {
     this.Cartproducts=JSON.parse(localStorage.getItem("cart")!);
    }
    console.log(this.Cartproducts)
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

}
