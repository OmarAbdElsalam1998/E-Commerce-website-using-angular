import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoreisService } from 'src/app/services/categoreis.service';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { ProductsService } from 'src/app/services/products.service';
import { newProduct } from '../../../shares classes/newproduct';
import Swal from 'sweetalert2';
import { BrandsService } from 'src/app/services/brands.service';
// import { newProduct } from '../../newproduct';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
productImages:any=[];  
categories:any;
subCategories:any;
brands:any;
colors:string[]=['red','green','blue','black','white','orange'];
selectedColors:any=[];
productSizes:any=[];
theirIsSubCategories:boolean=false;
addproductFor!:FormBuilder;
ckecked:boolean=false;
message:boolean=false;
  constructor(private fb:FormBuilder,private catsrviece:CategoreisService,
    private http: HttpClient ,private ProductService: ProductsService,
     private router: Router,private titleService:Title,private brandService:BrandsService) {}
  

addproductForm=this.fb.group(
  {
  brand:["",Validators.required],
  category:['',Validators.required],
  subCategory:[''],
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
    // this.titleService.setTitle(this.taptitle);
    this.catsrviece.getAllcategroies().subscribe(data=>{
      this.categories=data;
      console.log(this.categories)
    },error=>{console.log(error)});
    
    this.brandService.getAllbrands().subscribe(res=>{
      this.brands=res;
    });
  }
  get brand()
  {
    return this.addproductForm.get('brand')
  }
  get category()
  {
    return this.addproductForm.get('category')
  }
  get subCategory()
  {
    return this.addproductForm.get('subCategory')
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
  //console.log(this.addproductForm.value)
       
  var newprd=new newProduct(this.addproductForm.value.brand!,this.category?.value! ,this.subCategory?.value!,this.title?.value!,this.description?.value!,parseInt(this.numofitems?.value!),parseInt(this.price?.value!),parseInt(this.discound?.value!),this.productImages,this.overview?.value!,this.productSizes,this.selectedColors,0 );
  
    this.ProductService.postProduct(newprd)
    .subscribe(data =>
      {
        Swal.fire({
          
          title:  'Added Successfully',
          icon:'success' ,
          showConfirmButton:false,
          timer:1000
          
         });
          this.router.navigate(["dashboard/productslist"])
          this.message=true;
          this.addproductForm.reset();
          this.productImages='';
         
          
        },
     error =>{
        console.log("Error" , error)
      }
      
    )
 }
//get sub categoires of selected Category
 getSubCategories(event:any)
{
  this.catsrviece.getCategoryByName(event.target.value).subscribe(res=>{
    this.subCategories=res[0].subCategories;
    if(this.subCategories.length>0){
      this.subCategory?.setValidators(Validators.required);
      this.theirIsSubCategories=true;

    }
    console.log(this.subCategories);;
  })
}
 removemessage(){
  this.message=false;
 
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

//add list of Product colors
addColors(event:any){
  if(event.target.value){
    this.selectedColors.push(event.target.value);
  }
  console.log(event.target.value +" "+event.which);

   
}
//remove role from Array Of User Responsability
removeColor(index:number){
 this.selectedColors.splice(index,1);

}

//add list of products Sizes
addSize(event:any){
  if(event.which==13 && event.target.value.length>0){
    this.productSizes.push(event.target.value);
    event.target.value="";
  }
  console.log(event.target.value +" "+event.which);

   
}
//
removeSize(index:number){
 this.productSizes.splice(index,1);

}
}
