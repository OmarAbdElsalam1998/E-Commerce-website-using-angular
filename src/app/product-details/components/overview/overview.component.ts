import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
 overView:any;
  constructor(private router:Router,private productService:ProductsService) { }
  
  ngOnInit(): void {
    //get Product from Api
    this.productService.getaddProductById(parseInt(this.router.url.toString()[9])).subscribe(data => {
      this.overView = data.overview;
       
    }, error => { console.log(error) })
  }

}
