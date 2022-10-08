import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title="Products Page";
  constructor(private titleService:Title) { }

  ngOnInit(): void {
     this.titleService.setTitle(this.title);
  }
action(){
  console.log("action");
}
}
