import { Component, OnInit } from '@angular/core';
import { ProductsApiService } from '../services/products-api.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loader:any;
  constructor( private userService:UserAuthService,private productService:ProductsApiService) { 
    // this.userService.loader.subscribe(res=>{
    //   this.loader=res;
    // })
    this.productService.prloader.subscribe(res=>{
      this.loader=res;
      console.log(res)
    })
  }

  ngOnInit(): void {
  }

}
