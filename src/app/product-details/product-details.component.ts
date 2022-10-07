import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  //   $(function (){
  //     'use strict';
  //    $(".product-images .image img").each(image => {
  //     image.on("click",function(){

  //     });
      
  //    });      
  // });
    var images=document.querySelectorAll(".product-images .image img");
var mainImage=document.querySelector(" .main-image img");
alert("ass");
// images.forEach(image=>{
//     console.log("ima")
//     image.addEventListener("click",function(){
//         var src=this.getAttribute("src");
//         mainImage.setAttribute('src',src);
//         var list=this.parentNode.parentNode.children;
//         for(let child of list){
//             child.classList.remove('active');
//         }
//         this.parentNode.classList.add('active');
//     });
// })
  }

}
