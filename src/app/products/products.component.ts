import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IProudct } from 'Shared Classes and types/IProduct';
import { Product } from 'Shared Classes and types/model/product';
import { CartService } from '../services/cart.service';

// import { IProudct } from 'Shared Classes and types/IProduct';
// import { AddToCartService } from '../services/add-to-cart.service';
//import * as _ from 'lodash';
// import * as _ from 'lodash'
// import * as _ from 'lodash';
import { ProductsApiService } from '../services/products-api.service';
import { Cart } from '../shares classes/cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title="Products Page";
  productsList:any;
  categories:any;
  cartItem:any;
  items:any[] = [];
  products: any = [];
  constructor(private titleService:Title,private productService:ProductsApiService,private router:Router,
    private data1:HttpClient,private cart :CartService
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
    

    
    //  this.Getallproductscategories()
    //  this.filtercatogry()
     this.productList = this.PRODUCTS;
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
  deleteItemGFromCart(id:number){
    this.cart.DeleteItemFromCart(id);
  }
  
  addToFavorites(index:any){
    
    this.cart.getProductById(index);
    this.productService.addToCart(index);
    window.alert('Your product has been added to the favorites!');
   
    if (!this.productService.itemInCart(index)) {
      index.id= 1;
      this.productService.addToCart(index); //add items in cart
      this.items = [...this.productService.getItems()];
    }
    
  }
   
seeDetails(id:any){
   this.router.navigate(["products/",id]);
}
  



 
  




Getallproductscategories()
{
    this.titleService.setTitle(this.title); 
    this.productService.Getallproductscategories().subscribe(res1=>{
     this.categorieslist=res1;  

  },error=>{console.log(error)});
 
  
}
selectedcategoty="All";

filtercat(event:any)
{
let value=event.target.value;
this.getcats(value);
this.selectedcategoty=value;

}
getcats(keyword:string)
{
  this.productService.Getproductsbycategories(keyword).subscribe(res=>{
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
    case "Low":
      {
        this.productsList= this.arrayes.sort((low:any, high:any) => low.price - high.price);
        console.log(this.productsList);
        break;
      }

    case "High":
      {
        this.productsList = this.arrayes.sort((low:any, high:any) => high.price - low.price);
        break;
      }

    default: {
      this.productsList = this.arrayes.sort((low:any, high:any) => low.price - high.price);
      break;
    }

  }
  
  return this.productsList;

  // this.productsList=this.categorieslist2;

}


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

  
    public filterProducts(): void {
    const filteredProductArray = new Array<any>();
    const activeColors = this.colors.filter(c => c.selected).map(c => c.productColor);
    this.productList.forEach((prod: { product: any[]; }) => {
        const filteredSubProducts = prod.product.filter(p => activeColors.includes(p.productColor));
         if(filteredSubProducts.length > 0){
             const clonedProduct = Object.assign({}, prod);
             clonedProduct.product = filteredSubProducts;
             filteredProductArray.push(clonedProduct);
         }
    });
    this.productListShow = filteredProductArray;
    console.log(this.productListShow);
  }
}
