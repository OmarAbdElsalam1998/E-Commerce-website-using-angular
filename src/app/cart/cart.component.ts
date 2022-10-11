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
  public products:any=[];
  public grandTotal!:number;

  constructor(private titleService:Title,private router:Router,private CartSER:CartService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.CartSER.getProducts().subscribe(res=>{
      this.products=res;
      this.grandTotal=this.CartSER.getTotalPrice();
    })

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
