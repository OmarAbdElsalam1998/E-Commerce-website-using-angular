import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { newProduct } from '../../newproduct';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
productImages:any=[];  
categories:any;
ckecked:boolean=false;
message:boolean=false;
  constructor(private fb:FormBuilder,private catsrviece:ProductsApiService,
    private http: HttpClient ,private ProductService: ProductsApiService,
     private router: Router) {}

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
  image:[this.productImages,Validators.required],
  overview:['',Validators.required]
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
  get overview()
  {
    return this.addproductForm.get('overview')
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
  //console.log(this.addproductForm.value)public brand:string,
       
  var newprd=new newProduct(this.brand?.value , this.category?.value ,this.title?.value,this.description?.value,this.numofitems?.value,this.price?.value,this.discound?.value,this.productImages,this.overview?.value,[],[]);
  
    this.ProductService.postProduct(newprd)
    .subscribe(data =>
      {
      this.message=true;
          this.addproductForm.reset();
          this.productImages='';
          
        },
     error =>{
        console.log("Error" , error)
      }
      
    )
 }
 removemessage(){
  this.message=false;
  this.router.navigate(["dashboard/productslist"])
 }
 onSelectImageFromFile(event:any) {
  let fileType = event.target.files[0].type;
  if (fileType.match(/image\/*/)) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.productImages.push(event.target.result);
    };
  } else {
    window.alert('Please select correct image format');
  }
}
removeProductImage(index:number){
  this.productImages.splice(index,1);

}
}
