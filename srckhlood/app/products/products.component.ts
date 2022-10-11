import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductsApiService } from '../services/products-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title="Products Page";
  productsList:any;
  categorieslist:any;
  brandlist:any;
  categories:any;
  constructor(private titleService:Title,private productService:ProductsApiService,private router:Router) { }

  ngOnInit(): void {
     this.titleService.setTitle(this.title);
     this.productService.getAllProducts().subscribe(data=>{
       this.productsList=data;
       this.brandlist=data;
     },error=>{console.log(error)});

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
   this.router.navigate(["product/",id]);
}
arrayes:any=[];
Getallproductscategories()
{
    this.titleService.setTitle(this.title);
    this.productService.Getallproductscategories().subscribe(res1=>{
    this.categorieslist=res1;
    this.arrayes=res1;
    console.log(this.arrayes);
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

}
