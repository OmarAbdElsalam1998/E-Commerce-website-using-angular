import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
   title="Products Details";
  constructor(private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

  //   $(function (){
  //     'use strict';
  //    $(".product-images .image img").each(image => {
  //     image.on("click",function(){

  //     });
      
  //    });      
  // });
    
    
  }

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



