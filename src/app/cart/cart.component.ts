import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../shares classes/cart';
import { CartService } from '../services/cart.service';
import { ProductsApiService } from '../services/products-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  title = "Market Cart";
  public Cartproducts: any;
  totalPrice: any;
  addbrandForm: any;
  counter = 1;
  selectedProduct: any;
  product: any;
  productId: any;
  commentsRouter: string = "";

  
;
  overViewRouter: string = ""
  constructor(private titleService: Title, private router: Router, private CartSER: CartService
    ,private productService :ProductsApiService,
     private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.CartSER.getCartProducts().subscribe(res => {
      this.Cartproducts = res;
    });
  

     
    
   
  }
  // getCartProducts(){
  //  if("cart" in localStorage)
  //   {
  //    this.Cartproducts=JSON.parse(localStorage.getItem("cart")!);
  //   }
  //   console.log(this.Cartproducts)
  // }

  deleteItemFromCart(id: number) {
    this.CartSER.DeleteItemFromCart(id);
    this.CartSER.getCartProducts().subscribe(res => {
      this.Cartproducts = res;
    });
  }
  removeItem(item: any) {
    this.CartSER.removeCartData(item);
  }
  emptyCart() {
    this.CartSER.removeAllCart();
  }

  goToPaymentPage() {
    this.router.navigate(['/cart/payment']);
  }
  increaseProductCounter(productId: any, count: number) {

    this.CartSER.getProductformCartbyId(productId).subscribe(data=>{
      
      this.selectedProduct=data;
      
      var cart = new Cart(this.selectedProduct.productId, this.selectedProduct.title, this.selectedProduct.price, this.selectedProduct.discount, this.selectedProduct.thumbnail,
       ++count);
       console.log(cart);
        this.CartSER.UpdateCart(productId,cart).subscribe(data => {});
                   
            this.ngOnInit();
       })
   // });
    
     
  }


  deceaseProductCounter(productId: any, count: number) {

    this.CartSER.getProductformCartbyId(productId).subscribe(data=>{
      this.selectedProduct=data;
      if (count > 1) {
        var cart = new Cart(this.selectedProduct.productId, this.selectedProduct.title, this.selectedProduct.price, this.selectedProduct.discount, this.selectedProduct.thumbnail,
          --count);
           this.CartSER.UpdateCart(productId,cart).subscribe(data => {});
            this.ngOnInit();
    
          //  })  
      }
   });
   
  
  
  
  }

}
