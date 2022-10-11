import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import * as _ from 'lodash'
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
  categorieslist:any;
  categorieslist2:any;
  brandlist:any;
  arrayes:any;
  uniqueObjectArray: any;
  constructor(private titleService:Title,private productService:ProductsApiService,private router:Router) { }

  ngOnInit(): void {
     this.titleService.setTitle(this.title);
     this.productService.getAllProducts().subscribe(data=>{
     this.productsList=data;
     this.categorieslist2=data;
     },error=>{console.log(error)});
    
     this.Getallproductscategories()
  
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
Getallproductscategories()
{
    this.titleService.setTitle(this.title); 
    this.productService.Getallproductscategories().subscribe(res1=>{
     this.categorieslist=res1;  
  },error=>{console.log(error)});
 
  
}
selectedcategoty="All";

filtercat(event:any)
{
let value=event.target.value;
this.getcats(value);
this.selectedcategoty=value;

}
getcats(keyword:string)
{
  this.productService.Getproductsbycategories(keyword).subscribe(res=>{
  this.categorieslist2=res;
  this.productsList=res;
  console.log(this.categorieslist2);
  this.arrayes = Array.from(this.categorieslist2).sort();
  console.log(this.arrayes);
})
}

// sortbylowprice(event:any)
// {
//   let value=event.target.value;
//   this.arrayes =this.categorieslist2.sort((a1:any,b1:any)=>a1.price-b1.price);
//   this.categorieslist2=this.arrayes;
//   this.productsList=this.arrayes;
//   console.log(this.arrayes);
// }

sort(event: any) {

  switch (event.target.value) {
    case "Low":
      {
        this.productsList= this.arrayes.sort((low:any, high:any) => low.price - high.price);
        console.log(this.productsList);
        break;
      }

    case "High":
      {
        this.productsList = this.arrayes.sort((low:any, high:any) => high.price - low.price);
        break;
      }

    default: {
      this.productsList = this.arrayes.sort((low:any, high:any) => low.price - high.price);
      break;
    }

  }
  
  return this.productsList;

  // this.productsList=this.categorieslist2;

}

}
