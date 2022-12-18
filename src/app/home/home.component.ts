import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrandsService } from '../services/brands.service';
import { CartService } from '../services/cart.service';
import { CategoreisService } from '../services/categoreis.service';
import { FavouriteService } from '../services/favourite.service';
import { ProductsApiService } from '../services/products-api.service';
import { ProductsService } from '../services/products.service';
import { Cart } from '../shares classes/cart';
import { Favourite } from '../shares classes/favourite';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   title="Market";
   superMarket:any;
   menFashion:any;
   womenFashion:any;
   electronics:any;
   beautyAndHealth:any;
   favouriteItem:any;
   cartItem:any;
   brands:any;
   categories:any;

  constructor(private titleService:Title,public ProductsServic:ProductsService,private router:Router,
    private brandService:BrandsService,private categoryService:CategoreisService,private favouriteService:FavouriteService
    ,private cart:CartService) { }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ["<i class='fa-thin fa-arrow-left fa-fw fa-3x'></i>","<i class='fa-thin fa-arrow-right fa-fw fa-3x'></i>"],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    //get high ratrd products
    this.ProductsServic.Getproductsbycategories("SuperMarket").subscribe(data=>{
      // this.highRated=data.sort((a:any,b:any)=>b.rating -a.rating);
      this.superMarket=data;
    });


    //get product from men shirts Categoty
    this.ProductsServic.Getproductsbycategories("Men").subscribe(data=>{
      this.menFashion=data;
      console.log(data);
    });
    //get product from womenDresses Categoty
    this.ProductsServic.Getproductsbycategories("Women").subscribe(data=>{
      this.womenFashion=data;
      console.log(data);
    });
    //get product from men shirts Categoty
    this.ProductsServic.Getproductsbycategories("Electronics").subscribe(data=>{
      this.electronics=data;
      console.log(data);
    });
    //get product from men shirts Categoty
    this.ProductsServic.Getproductsbycategories("Beauty-Health").subscribe(data=>{
      this.beautyAndHealth=data;
      console.log(data);
    });

    //Get our Brands
    this.brandService.getAllbrands().subscribe(res=>{
      this.brands=res;
    })
    this.categoryService.getAllcategroies().subscribe(res=>{
      this.categories=res;
    });

  }

  addToCart(index:any){
    
    this.cart.getProductById(index).subscribe(res=>{
      this.cartItem=res;
      console.log(res);
      console.log(this.cartItem)
      var cart =new Cart(this.cartItem.id,this.cartItem.title,this.cartItem.price,this.cartItem.discound,this.cartItem.images[0],1);
    this.cart.saveproduct(cart).subscribe(data =>
      {
        // this.usersArr=data;
      },
      error =>
        {
        }
        );


    });

   
    

  }

  //add item to favourite
  addToFavorites(index:any){
    this.favouriteService.getProductById(index).subscribe(res=>{
      this.favouriteItem=res;
      console.log(res);
      console.log(this.favouriteItem)
      var favourites =new Favourite(this.favouriteItem.id,this.favouriteItem.title,this.favouriteItem.images[0])
    this.favouriteService.saveproduct(favourites).subscribe(data =>
      {
        // this.usersArr=data;
      },
      error =>
        {
        }
        );


    });
  }
  seeDetails(productId:any){
    this.router.navigate(["product/"+productId])
  }
}
