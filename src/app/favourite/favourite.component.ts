import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CartService } from '../services/cart.service';
import { FavouriteService } from '../services/favourite.service';
import { ProductsApiService } from '../services/products-api.service';
import { Cart } from '../shares classes/cart';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  title="Favorites";
  item:any;
  constructor(private titleService:Title,private router:Router,
    private cartService:CartService,private prodService:ProductsApiService,
    private favouriteService:FavouriteService
    ) { }
  
items:any[] = [];
public Cartproducts:any=[];
favouriteList:any;
  ngOnInit(): void {
     this.favouriteService.getfavouriteProductes().subscribe(res=>{
      this.favouriteList=res;
     })

  }
  seeDetails(id:any){
     this.router.navigate(["products/",id]);
  }

  addToCart(index:any){
    
    this.cartService.getProductById(index).subscribe(res=>{
      this.item=res;
      console.log(res);
      console.log(this.item)
      var cart =new Cart(this.item.id,this.item.title,this.item.price,this.item.discountPercentage,this.item.thumbnail,1);
    this.cartService.saveproduct(cart).subscribe(data =>
      {
        this.removeFromFavourite(index);
       },
      error =>
        {
        }
        );


    });
  }
  removeFromFavourite(id:any){
    this.favouriteService.DeleteItemFromFavourite(id);
    this.favouriteService.getfavouriteProductes().subscribe(res=>{
      this.favouriteList=res;
     })

  }
}
