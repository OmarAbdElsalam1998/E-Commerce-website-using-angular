import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import * as _ from 'lodash';
import { ProductsApiService } from '../services/products-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title="Products Page";
  productsList:any;
  categories:any;
  categorieslist:any;
  categorieslist2:any;
  brandlist:any;
  arrayes:any;
  uniquecat :any;
  item: any;
  uniqueObjectArray: any;
  constructor(private titleService:Title,private productService:ProductsApiService,private router:Router) { }
  productList:any;
  productListShow:any; 
  
  ngOnInit(): void {
     this.titleService.setTitle(this.title);
     this.productService.getAllProducts().subscribe(data=>{
     this.productsList=data;
     this.categorieslist2=data;
     },error=>{console.log(error)});
     this.productList = this.PRODUCTS;
      this.productListShow = this.productList; 
      


    
     this.Getallproductscategories()
     this.filtercatogry()
  
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    
  }
addToCart(index:any){
  
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
filtercatogry()
{
// let value=event.target.value;
console.log(this.categorieslist);
}
temparray:any=[];
newarray:any=[];
onchange(event:any){
  // let value=event.target.checked;
  // console.log(value);
  if(event.target.checked)
  {
 this.temparray=this.arrayes.filter((e:any)=>e.i==event.target.value);
 console.log(this.temparray);
  }
  else{

  }
}
result:any=[];

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
  this.productsList=res;
  this.title=keyword;
  this.titleService.setTitle(this.title);
  


})

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
