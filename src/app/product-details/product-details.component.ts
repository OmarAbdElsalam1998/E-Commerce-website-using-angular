import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsApiService } from '../services/products-api.service';
import * as $ from 'jquery';
import { CartService } from '../services/cart.service';
import { Cart } from '../shares classes/cart';

declare function slider():void;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
   title:any;
  constructor(private titleService:Title,private productService:ProductsApiService,
    private activatedRoute:ActivatedRoute,public router:Router,
    private cartService:CartService) { }
  productId:any;
  product:any;
  mainImage:any;
  selectedProduct:any;
  counterValue=1;
  commentsRouter:string=""
  overViewRouter:string=""
  ngOnInit(): void {
   //get product Id From url
   this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
    this.productId=params.get("id");
    this.commentsRouter="/product/"+this.productId+"/comments";
    this.overViewRouter="/product/"+this.productId;


    //get Product from Api
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.product=data,
      this.title=this.product.title;
      console.log(this.title)
      this.titleService.setTitle(this.title);
    },error=>{console.log(error)})

   });
  
  }
   ngAfterViewInit(): void {
    if(localStorage.getItem("ProductYouSeeBefore")){
      let arr=[];
      var locaStorageData=localStorage.getItem("ProductYouSeeBefore");
      arr=JSON.parse(locaStorageData!);
      arr.push(this.productId);
      window.localStorage.setItem("ProductYouSeeBefore",JSON.stringify(arr));

    }
    else{
      let arr=[];
      arr.push(this.productId);
      window.localStorage.setItem("ProductYouSeeBefore",JSON.stringify(arr));

    }
    
  }

  changeImage(d:any){
     this.mainImage=d;
  }

  addToCart(productId:number){
    this.cartService.getProductById(productId).subscribe(res=>{
      this.selectedProduct=res;
      console.log(res);
      console.log(this.selectedProduct)
      var cart =new Cart (this.selectedProduct.id,this.selectedProduct.title,this.selectedProduct.price,this.selectedProduct.discountPercentage,this.selectedProduct.thumbnail,this.counterValue);
    this.cartService.saveproduct(cart).subscribe(data =>
      {
        // this.usersArr=data;
      },
      error =>
        {
        }
        );
        this.router.navigate(['/products']);



    })
  }
  increaseNumberOfItems(counter:any){
this.counterValue++;
  }
decreaseNumberOfItems(counter:any){
  if(this.counterValue>1){
    this.counterValue --;

  }

  }
  

}



