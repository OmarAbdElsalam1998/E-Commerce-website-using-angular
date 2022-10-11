import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IProudct } from 'Shared Classes and types/IProduct';
import { Product } from 'Shared Classes and types/model/product';
import { CartService } from '../services/cart.service';

// import { IProudct } from 'Shared Classes and types/IProduct';
// import { AddToCartService } from '../services/add-to-cart.service';
//import * as _ from 'lodash';
import { ProductsApiService } from '../services/products-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title="Products Page";
  productsList:any;
  categories:any;
  items:any[] = [];
  products: any = [];
  constructor(private titleService:Title,private productService:ProductsApiService,private router:Router,
    private data1:HttpClient,private cart :CartService
   ) { }

  categorieslist:any;
  categorieslist2:any;
  brandlist:any;
  arrayes:any;
  uniquecat :any;
  item: any;
  uniqueObjectArray: any;
  //constructor(private titleService:Title,private productService:ProductsApiService,private router:Router) { }

  ngOnInit(): void {
     this.titleService.setTitle(this.title);
     this.productService.getAllProducts().subscribe(data=>{
     this.productsList=data;
     this.categorieslist2=data;
     },error=>{console.log(error)});
      

     this.productService.getProductData().subscribe(res => {
      this.products = res;
     })
    

    
    //  this.Getallproductscategories()
    //  this.filtercatogry()
  
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    
  }
   addToCart(index:any){
    
    this.cart.getProductById(index);
    this.productService.addToCartt(index);
    window.alert('Your product has been added to the cart!');
   
    if (!this.productService.itemInCart(index)) {
      index.id= 1;
      this.productService.addToCartt(index); //add items in cart
      this.items = [...this.productService.getItems()];
    }
    

  }
   
seeDetails(id:any){
   this.router.navigate(["product/",id]);
}
  }



 
  



