import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsApiService } from '../services/products-api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
   title:any;
  constructor(private titleService:Title,private productService:ProductsApiService,private activatedRoute:ActivatedRoute) { }
  productId:any;
  product:any;
  ngOnInit(): void {

   //get product Id From url
   this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
    this.productId=params.get("id");


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
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    

   }


  //   $(function (){
  //     'use strict';
  //    $(".product-images .image img").each(image => {
  //     image.on("click",function(){

  //     });
      
  //    });      
  // });
    
    
  

  // changeImage=()=>{
  //   var images=document.querySelectorAll(".product-images .image img");
  //   var mainImage=document.querySelector(".main-image img");
  //   images.forEach(image=>{
  //     image.addEventListener("click",function(){
  //         let src=image.getAttribute("src");
  //         mainImage.setAttribute('src',src);
  //         var list=image.parentNode.parentNode.children;
  //         for(let child of list){
  //             child.classList.remove('active');
  //         }
  //         this.parentNode.classList.add('active');
  //     });
  // })
  //   }
}



