import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsApiService } from 'srckhlood/app/services/products-api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  constructor(private router:Router,private cart:CartService,private productService:ProductsApiService
    
  ) { }

  ngOnInit(): void {
  }
  addToCart(index:any){
    this.cart.getProductById(index);
    this.productService.add(index);
    window.alert('Your product has been added to the cart!');
   
    if (!this.productService.itemInCart(index)) {
      index.id= 1;
      this.productService.addToCart(index); //add items in cart
      this.items = [...this.productService.getItems()];
    }
  }
  seeDetails(id:any){
     this.router.navigate(["product/",id]);
  }
}
