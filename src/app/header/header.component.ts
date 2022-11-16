import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../services/favourite.service';
import { ProductsApiService } from '../services/products-api.service';
import { ProductsService } from '../services/products.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:any;
  username:any;
  isAdmin:any;
  favouriteCounter:any;
  cartCounter:any;

  constructor(private userauth:UserAuthService,private router:Router,
    private userAuth:UserAuthService,private productApi:ProductsService,
    private cartService:CartService,private favouriteService:FavouriteService) { 
    this.isLoggedIn=this.userAuth.getLoggedStatus();
    console.log(this.username)
   
  }
    
  ngOnInit(): void {
    this.userauth.getLoggedStatus().subscribe(status=>{
      this.isLoggedIn=status;
    })
    this.userauth.getUsername().subscribe(status=>{
      this.username=status;
    })
   this.userAuth.getIsAdminStatus().subscribe(status=>{ this.isAdmin=status});
   this.cartService.getCartProductsCounter().subscribe(res=>{
    this.cartCounter=res;
   })
   this.favouriteService.getfavouriteProductesCounter().subscribe(res=>{
    this.favouriteCounter=res;
   })

   
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    var s=document.getElementsByClassName("top-nav")[0];
    
  }

  logOut(){
    this.userauth.logOut();
    this.router.navigate([""]);

  }

  search (keyword: any) 
  { if(keyword.value!=""){
    this.productApi.searchData(keyword.value);
    this.router.navigate(["search/" + keyword.value]);
    keyword.value="";
  }
    
  }

  

}
