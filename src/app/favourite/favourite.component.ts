import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductsApiService } from 'srckhlood/app/services/products-api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  constructor(private router:Router,private cart:CartService,private prodService:ProductsApiService
    ,private data1:HttpClient) { }
items:any[] = [];
productsList:any;
  ngOnInit(): void {
    
  }
  addTofavorites(index:any){
    
    // this.cart.getProductById(index);
    // this.prodService.addToCartt(index);
    // window.alert('Your product has been added to the favorites!');
   
    // if (!this.prodService.itemInCart(index)) {
    //   index.id= 1;
    //   this.prodService.addToCartt(index); //add items in cart
    //   this.items = [...this.prodService.getItems()];
    // }
    
  }
  seeDetails(id:any){
     this.router.navigate(["product/",id]);
  }
}
