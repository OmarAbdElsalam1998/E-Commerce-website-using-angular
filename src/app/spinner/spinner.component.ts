import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import { ProductsApiService } from '../services/products-api.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loader:any;
  cartLoader:any;
  usersLoader:any;
  constructor( private userService:UserAuthService,private productService:ProductsApiService,
    private cartService:CartService ,
    private loginService:LoginService) { 

    // this.userService.loader.subscribe(res=>{
    //   this.loader=res;
    // })
    // this.productService.prloader.subscribe(res=>{
    //   this.loader=res;
    //   console.log(res)
    // })
    this.cartService.cartLoader.subscribe(res=>{
      this.loader=res;
      console.log(res)
    })
  //  / // this.loginService.Loginloader.subscribe(res=>{
  //     this.loader=res;
  //     console.log(res)
  //   })
  }

  ngOnInit(): void {
  }

}
