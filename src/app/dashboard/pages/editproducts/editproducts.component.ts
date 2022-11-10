import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { newProduct } from '../../newproduct';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.scss']
})
export class EditproductsComponent implements OnInit {

  productImages:any=[];  
  categories:any;
  ckecked:boolean=false;
  // newprd:newProduct=new newProduct(0,"","","","",0,0,0,'');
  message:boolean=false;
  
    constructor(private fb:FormBuilder,private catsrviece:ProductsApiService,
      private http: HttpClient ,private ProductService: ProductsApiService,
       private router2: ActivatedRoute ,private router:Router) {
      
  
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
    image:[this.productImages,Validators.required],
    overview:['',Validators.required]
  });
  
    ngOnInit(): void {
      this.catsrviece.getcategories().subscribe(data=>{
        this.categories=data;
      },error=>{console.log(error)});
      this.ProductService.getaddProductById(this.router2.snapshot.params['id']).subscribe((result:any)=>{
        console.log(result);
     this.addproductForm.controls['brand'].setValue(result['brand']);
     this.addproductForm.controls['category'].setValue(result['category']);
     this.addproductForm.controls['title'].setValue(result['title']);
     this.addproductForm.controls['description'].setValue(result['description']);
     this.addproductForm.controls['price'].setValue(result['price']);
     this.addproductForm.controls['numofitems'].setValue(result['numofitems']);
     this.addproductForm.controls['discound'].setValue(result['discound']);
     this.productImages=result['images']
     this.addproductForm.controls['overview'].setValue(result['overview']);
      })
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
    Updateproduct(){
      var newprd=new newProduct(this.brand?.value , this.category?.value ,this.title?.value,this.description?.value,this.numofitems?.value,this.price?.value,this.discound?.value,this.productImages,this.overview?.value,[],[]);
      this.ProductService.putProduct(newprd,this.router2.snapshot.params['id'])
      .subscribe(data =>
        {
        // alert("Product added Successfully")
        this.message=true;
            this.addproductForm.reset();
            // this.router.navigate(["products"])
          },
       error =>{
          alert("Error")
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
  

