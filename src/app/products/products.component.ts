import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IProudct } from 'Shared Classes and types/IProduct';
import { Product } from 'Shared Classes and types/model/product';
import { CartService } from '../services/cart.service';
import { CategoreisService } from '../services/categoreis.service';
import { FavouriteService } from '../services/favourite.service';

// import { IProudct } from 'Shared Classes and types/IProduct';
// import { AddToCartService } from '../services/add-to-cart.service';
//import * as _ from 'lodash';
// import * as _ from 'lodash'
// import * as _ from 'lodash';
import { ProductsApiService } from '../services/products-api.service';
import { ProductsService } from '../services/products.service';
import { Cart } from '../shares classes/cart';
import { Favourite } from '../shares classes/favourite';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title="Products Page";
  page=1;
  productsList:any;
  categoryFromUrl:any;
  categories:any;
  cartItem:any;
  favouriteItem:any;
  items:any[] = [];
  products: any = [];
  brands:any;
  displayGrid:boolean=true;
  subCategories:any;

  constructor(private titleService:Title,private productService:ProductsService,private router:Router,
    private data1:HttpClient,private cart :CartService,private activatedRoute:ActivatedRoute,
    private favouriteService:FavouriteService,private categoryService:CategoreisService
   ) { }

  categorieslist:any;
  categorieslist2:any[]=[];
  brandlist:any;
  arrayes:any;
  uniqueObjectArray: any;
  //constructor(private titleService:Title,private productService:ProductsApiService,private router:Router) { }

 // constructor(private titleService:Title,private productService:ProductsApiService,private router:Router) { }
  productList:any;
  productListShow:any; 
  
  ngOnInit(): void {
   
    
     this.titleService.setTitle(this.title);
    
     this.productService.getProduct().subscribe(data=>{
     this.productsList=data;
     this.categorieslist2=data;
     console.log(data);
    
     },error=>{console.log(error)});
      

     this.productService.getProductData().subscribe(res => {
      this.products = res;
     })
       //get category from url
       this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
        this.categoryFromUrl=params.get("category");
        console.log(this.categoryFromUrl)
  
        if(this.categoryFromUrl){
          this.productService.Getproductsbycategories(this.categoryFromUrl).subscribe(res=>{
            console.log(res)
          this.productsList=res;
        })
        this.selectedcategoty=this.categoryFromUrl;
      }
    });
    

    
    //  this.Getallproductscategories()
    //  this.filtercatogry()
     this.productList = this.productsList;
      this.productListShow = this.productList; 
      


    
     this.Getallproductscategories()
  
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    
  }
  changeDisplay(str:string){
    if(str=='grid'){
      this.displayGrid=true;
    }else{
      this.displayGrid=false;
    }
  }
   addToCart(index:any){
    
    this.cart.getProductById(index).subscribe(res=>{
      this.cartItem=res;
      console.log(res);
      console.log(this.cartItem)
      var cart =new Cart(this.cartItem.id,this.cartItem.title,this.cartItem.price,this.cartItem.discound,this.cartItem.images[0],1);
    this.cart.saveproduct(cart).subscribe(data =>
      {
        // this.usersArr=data;
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
 
  
  //go to the selected product to see getails
seeDetails(id:any){
   this.router.navigate(["product/",id]);
}
  
//get all items categories from api


Getallproductscategories()
{
    this.titleService.setTitle(this.title); 
    this.categoryService.getAllcategroies().subscribe(res1=>{
     this.categorieslist=res1;
     

  },error=>{console.log(error)});
 
  
}
selectedcategoty="All";

// filtercat(event:any)
// {
// let value=event.target.value;
// this.getcats(value);
// console.log(value);
// this.selectedcategoty=value;

// }
filterByCategory(category:any,index:number)
{
  this.categoryService.getCategoryByName(category).subscribe(res=>{
    this.subCategories=res[0].subCategories;

  })
this.getcats(category);


}
filterBySubCategory(sub:any,index:any){
  this.productService.GetproductsbySubcategories(sub).subscribe(res=>{
    this.productList=[...res]
    console.log(res);
  })
}
getcats(keyword:string)
{
  this.productService.Getproductsbycategories(keyword).subscribe(res=>{
    console.log(res)
  this.productsList=res;  
  this.title=keyword;
  this.titleService.setTitle(this.title);
  


})
}

// sortbylowprice(event:any)
// {
//   let value=event.target.value;
//   this.arrayes =this.categorieslist2.sort((a1:any,b1:any)=>a1.price-b1.price);
//   this.categorieslist2=this.arrayes;
//   this.productsList=this.arrayes;
//   console.log(this.arrayes);
// }

sort(event: any) {

  switch (event.target.value) {
    case "LowPrice":
      {
        this.productsList.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price));

         
        break;
      }

    case "HighPrice":
      {
           this.productsList.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));
         
         console.log(this.productsList.products);
        break;
      }

      case "LowRate":
        {
           this.productsList.sort((a:any, b:any) => parseFloat(a.rating) - parseFloat(b.rating));
  
           
          break;
        }
  
      case "HighRate":
        {
            this.productsList.sort((a:any, b:any) => parseFloat(b.rating) - parseFloat(a.rating));
           
           console.log(this.productsList.products);
          break;
        }

  }
  
  return this.productsList;

  // this.productsList=this.categorieslist2;

}
// public filterProducts(): void {
//   const filteredProductArray = new Array<any>();
//   const activeProducts = this.productList.filter((c:any) => c.selected).map((c:any) => c.productColor);
//   this.productList.forEach((prod: { product: any[]; }) => {
//       const filteredSubProducts = prod.product.filter(p => activeProducts.includes(p.productColor));
//        if(filteredSubProducts.length > 0){
//            const clonedProduct = Object.assign({}, prod);
//            clonedProduct.product = filteredSubProducts;
//            filteredProductArray.push(clonedProduct);
//        }
//   });
//   this.productListShow = filteredProductArray;
//   console.log(this.productListShow);
// }
  
}
