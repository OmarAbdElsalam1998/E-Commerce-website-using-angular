import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { newProduct } from '../newproduct';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
categories:any;
ckecked:boolean=false;
newprd:newProduct=new newProduct("","","","",0,0,0,"");

  constructor(private fb:FormBuilder,private catsrviece:ProductsApiService,
    private http: HttpClient ,private ProductService: ProductsApiService,
     private router: Router) {
    

  }

addproductForm=this.fb.group(
  {
  brand:['',Validators.required],
  category:['',Validators.required],
  title:['',Validators.required], 
  description:['',Validators.required],
  numofitems:['',Validators.required],
  price:['',[Validators.required,Validators.min(0)]],
  subscribe:[false],
  discound:[''],
  image:['',Validators.required]
});

  ngOnInit(): void {
    this.catsrviece.getcategories().subscribe(data=>{
      this.categories=data;
    },error=>{console.log(error)});
  }
  get brand()
  {
    return this.addproductForm.get('brand')
  }
  get category()
  {
    return this.addproductForm.get('category')
  }
  get title()
  {
    return this.addproductForm.get('title')
  }
  get description()
  {
    return this.addproductForm.get('description')
  }
  get price(){
return this.addproductForm.get('price')
  }
  get discound()
  {
    return this.addproductForm.get('discound')
  }
  get numofitems()
  {
    return this.addproductForm.get('numofitems')
  }
  get image()
  {
    return this.addproductForm.get('image')
  }
  clicked(){
    this.ckecked =! this.ckecked;
  }
  setDiscountValidation()
  {
    this.addproductForm.get('subscribe')?.valueChanges.subscribe(
      checkedValue=>{
        if(checkedValue)
        {
          this.discound?.setValidators(Validators.required);
        }
        else
        {
          this.discound?.clearValidators();
        }
        this.discound?.updateValueAndValidity();
      }
    )
  }
 addproduct(){
  console.log(this.addproductForm.value);
    this.ProductService.saveproduct(this.addproductForm.value)
    .subscribe(data =>
      {
      // alert("Product added Successfully")
          this.addproductForm.reset();
          this.router.navigate(["products"])
        },
     error =>{
        console.log("Error" , error)
      }
      
      )
 }
}
