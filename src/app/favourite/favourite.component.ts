import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CartService } from '../services/cart.service';
import { ProductsApiService } from '../services/products-api.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  title="Favorites";
  constructor(private titleService:Title,private router:Router,private cart:CartService,private prodService:ProductsApiService
    ) { }
  
items:any[] = [];
public Cartproducts:any=[];
productsList:any;
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
  addTofavorites(index:any){
   
    
    
  }
  seeDetails(id:any){
     this.router.navigate(["product/",id]);
  }
}
