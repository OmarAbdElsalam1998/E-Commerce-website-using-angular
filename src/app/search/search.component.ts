import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../services/favourite.service';
import { ProductsApiService } from '../services/products-api.service';
import { Cart } from '../shares classes/cart';
import { Favourite } from '../shares classes/favourite';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public selectedInput :BehaviorSubject<any>
  favouriteItem:any;
  constructor(
    private productService : ProductsApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private titleService:Title,
    private cart :CartService,
    private favouriteService:FavouriteService
   ) 
    {
      this.selectedInput= new BehaviorSubject<any> ("")
    }
   

  title="Search Page";
  productsList:any;
  cartItem:any;

  keyword:any;
  ngOnInit(): void 
  {
    
    this.titleService.setTitle(this.title);
    // this.activateRoute.paramMap.subscribe((param:ParamMap)=>    //load all data with specific condition like in html line 8  with (id and it's data)
    // {
    //   this.selectedInput.next(param.get("keyword"));
    // })

      //  this.selectedInput.subscribe(data=>{this.keyword=data ;console.log(this.keyword)});
    this.productService.getsearchResultData().subscribe(data=>{
      this.productsList=data;
      console.log(data);
    });

 
  }

  addToCart(index:any){
    this.cart.getProductById(index).subscribe(res=>{
      this.cartItem=res;
      console.log(res);
      console.log(this.cartItem)
      var cart =new Cart(this.cartItem.id,this.cartItem.title,this.cartItem.price,this.cartItem.discountPercentage,this.cartItem.thumbnail,1);
    this.cart.saveproduct(cart).subscribe(data =>
      {
        console.log(data);
      },
      error =>
        {
        }
        );


    });
  }
    //add item to favourite
    addToFavorites(index:any){
      this.favouriteService.getProductById(index).subscribe(res=>{
        this.favouriteItem=res;
        console.log(res);
        console.log(this.favouriteItem)
        var favourites =new Favourite(this.favouriteItem.id,this.favouriteItem.title,this.favouriteItem.thumbnail)
      this.favouriteService.saveproduct(favourites).subscribe(data =>
        {
          // this.usersArr=data;
        },
        error =>
          {
          }
          );
  
  
      });
    }
  seeDetails(id:any){
     this.router.navigate(["products/",id]);
  }

  sort(event: any) {

    switch (event.target.value) {
      case "LowPrice":
        {
           console.log(this.productsList.products.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price)));
  
           //this.productList.products= this.productList?.products.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price));
           
          break;
        }
  
      case "HighPrice":
        {
             console.log(this.productsList.products.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price)));
            // this.productList?.products.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));
           
           console.log(this.productsList.products);
          break;
        }
  
        case "LowRate":
          {
             console.log(this.productsList.products.sort((a:any, b:any) => parseFloat(a.rating) - parseFloat(b.rating)));
    
             //this.productList.products= this.productList?.products.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price));
             
            break;
          }
    
        case "HighRate":
          {
               console.log(this.productsList.products.sort((a:any, b:any) => parseFloat(b.rating) - parseFloat(a.rating)));
              // this.productList?.products.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));
             
             console.log(this.productsList.products);
            break;
          }
  
    }
    
    return this.productsList;
  
    // this.productsList=this.categorieslist2;
  
  }

}
