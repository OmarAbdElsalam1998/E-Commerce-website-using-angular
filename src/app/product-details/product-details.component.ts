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

}
