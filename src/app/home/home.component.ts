import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsApiService } from '../services/products-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   title="Market";
   highRated:any;
   menShirts:any;
   womenDresses:any;
   smartPhones:any;
   laptops:any;

  constructor(private titleService:Title,public ProductsServic:ProductsApiService,private router:Router) { }
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
    this.ProductsServic.getAllProducts().subscribe(data=>{
      this.highRated=data.products.sort((a:any,b:any)=>b.rating -a.rating);
    });


    //get product from men shirts Categoty
    this.ProductsServic.Getproductsbycategories("mens-shirts").subscribe(data=>{
      this.menShirts=data.products;
      console.log(data);
    });
    //get product from womenDresses Categoty
    this.ProductsServic.Getproductsbycategories("womens-dresses").subscribe(data=>{
      this.womenDresses=data.products;
      console.log(data);
    });
    //get product from men shirts Categoty
    this.ProductsServic.Getproductsbycategories("smartphones").subscribe(data=>{
      this.smartPhones=data.products;
      console.log(data);
    });
    //get product from men shirts Categoty
    this.ProductsServic.Getproductsbycategories("laptops").subscribe(data=>{
      this.laptops=data.products;
      console.log(data);
    });

  }

  addToCart(productId:any){

  }
  addToFavourite(productId:any){

  }
  seeDetails(productId:any){
    this.router.navigate(["product/"+productId])
  }
}
