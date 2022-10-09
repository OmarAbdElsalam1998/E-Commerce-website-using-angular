import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  constructor(private titleService:Title,private productService:ProductsApiService,private router:Router) { }

  ngOnInit(): void {
     this.titleService.setTitle(this.title);
     this.productService.getAllProducts().subscribe(data=>{
       this.productsList=data;
     },error=>{console.log(error)});
      


  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    
  }
addToCart(index:any){
  
}
seeDetails(id:any){
   this.router.navigate(["product/",id]);
}
}
