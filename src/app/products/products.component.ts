import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IProudct } from 'Shared Classes and types/IProduct';
import { Product } from 'Shared Classes and types/model/product';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../services/favourite.service';

// import { IProudct } from 'Shared Classes and types/IProduct';
// import { AddToCartService } from '../services/add-to-cart.service';
//import * as _ from 'lodash';
// import * as _ from 'lodash'
// import * as _ from 'lodash';
import { ProductsApiService } from '../services/products-api.service';
import { Cart } from '../shares classes/cart';
import { Favourite } from '../shares classes/favourite';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title="Products Page";
  productsList:any;
  categoryFromUrl:any;
  categories:any;
  cartItem:any;
  favouriteItem:any;
  items:any[] = [];
  products: any = [];
  constructor(private titleService:Title,private productService:ProductsApiService,private router:Router,
    private data1:HttpClient,private cart :CartService,private activatedRoute:ActivatedRoute,
    private favouriteService:FavouriteService
   ) { }

  categorieslist:any;
  categorieslist2:any;
  brandlist:any;
  arrayes:any;
  uniqueObjectArray: any;
  //constructor(private titleService:Title,private productService:ProductsApiService,private router:Router) { }

 // constructor(private titleService:Title,private productService:ProductsApiService,private router:Router) { }
  productList:any;
  productListShow:any; 
  
  ngOnInit(): void {
   
    
     this.titleService.setTitle(this.title);
    
     this.productService.getAllProducts().subscribe(data=>{
     this.productsList=data;
     this.categorieslist2=data;
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
   addToCart(index:any){
    
    this.cart.getProductById(index).subscribe(res=>{
      this.cartItem=res;
      console.log(res);
      console.log(this.cartItem)
      var cart =new Cart(this.cartItem.id,this.cartItem.title,this.cartItem.price,this.cartItem.discountPercentage,this.cartItem.thumbnail,1);
    this.cart.saveproduct(cart).subscribe(data =>
      {
        // this.usersArr=data;
      },
      error =>
        {
        }
        );


    });

   
    // data.subscribe((result=>{
    //   this.pro=result;
    //   console.log(this.pro)
     
    // }))
    // var productt={
    //   "title":this.pro.title,
    //   "price":this.pro.price,
    //   "discount":this.pro.discountPercentage,
    //   "thumbnail":this .pro.thumbnail,
    //   "count": 1
    
    //   }
    
    // console.log(this.pro   )
    // var s=new Object(productt);
    //this.productService.addToCart(index);
    // window.alert('Your product has been added to the cart!');
   
    // if (!this.productService.itemInCart(index)) {
    //   index.id= 1;
    //   this.productService.addToCart(index); //add items in cart
    //   this.items = [...this.productService.getItems()];
    // }
    

  }
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
 

  // addToFavorites(index:any){
    
  //   this.cart.getProductById(index);
  //   this.productService.addToCart(index);
  //   window.alert('Your product has been added to the favorites!');
   
  //   if (!this.productService.itemInCart(index)) {
  //     index.id= 1;
  //     this.productService.addToCart(index); //add items in cart
  //     this.items = [...this.productService.getItems()];
  //   }
    
  // }
   
seeDetails(id:any){
   this.router.navigate(["products/",id]);
}
  



 
  




Getallproductscategories()
{
    this.titleService.setTitle(this.title); 
    this.productService.Getallproductscategories().subscribe(res1=>{
     this.categorieslist=res1;  
     console.log(this.categorieslist)

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
filterByCategory(category:any)
{
this.getcats(category);
console.log(category);
this.selectedcategoty=category;

}
getcats(keyword:string)
{
  this.productService.Getproductsbycategories(keyword).subscribe(res=>{
    console.log(res)
  this.categorieslist2=res;
  this.productsList=res;
  console.log(this.categorieslist2);
  this.arrayes = Array.from(this.categorieslist2).sort();
  console.log(this.arrayes);
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


public colors: any[] = [
  {
    id: 1,
    productColor: "Black",
    selected: false,
  },
  {
    id: 2,
    productColor: "Green",
    selected: false,
  }
  ]
    PRODUCTS: any[] = [
    {
        id: 1,
        productCat:'Jeans',
        product: [
            {
                productId: '1',
                productName: 'Trendy Jeans',
                productColor: 'Green',
            },
            {
                productId: '2',
                productName: 'Black tapered Jeans',
                productColor: 'Black',
            },
        ],
    },
    {
        id: 2,
        productCat:'Shirts',
        product: [
            {
                productId: '1',
                productName: 'Trendy Shirts',
                productColor: 'Green',
            },
            {
                productId: '2',
                productName: 'Black Shirts',
                productColor: 'Black',
            },
        ],
    },
]

  
   
}
