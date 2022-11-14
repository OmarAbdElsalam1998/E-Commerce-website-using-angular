import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoreisService } from 'src/app/services/categoreis.service';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { newProduct } from '../../newproduct';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.scss']
})
export class EditproductsComponent implements OnInit {

  productImages:any=[];  
  categories:any;
  ckecked:boolean=false;
  message:boolean=false;
  currentProduct:any;
  
    constructor(private fb:FormBuilder,private catsrviece:CategoreisService,
      private http: HttpClient ,private ProductService: ProductsService,
       private router2: ActivatedRoute ,private router:Router,private titleService:Title) {
   
  
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
    image:[''],
    overview:['',Validators.required]
  });
  
    ngOnInit(): void {
     
      this.catsrviece.getAllcategroies().subscribe(data=>{
        this.categories=data;
      },error=>{console.log(error)});

     this.ProductService.getaddProductById(this.router2.snapshot.params['id']).subscribe((result:any)=>{
       this.currentProduct=result;
     this.addproductForm.controls['brand'].setValue(result['brand']);
     this.addproductForm.controls['category'].setValue(result['category']);
     this.addproductForm.controls['title'].setValue(result['title']);
     this.addproductForm.controls['description'].setValue(result['description']);
     this.addproductForm.controls['price'].setValue(result['price']);
     this.addproductForm.controls['numofitems'].setValue(result['numofitems']);
     this.addproductForm.controls['discound'].setValue(result['discound']);
     this.productImages=result['images']
     this.addproductForm.controls['overview'].setValue(result['overview']);
     this.titleService.setTitle("Edit Product | "+result['title']);
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
      var newprd=new newProduct(this.addproductForm.value.brand!,this.category?.value! ,this.title?.value!,this.description?.value!,parseInt(this.numofitems?.value!),parseInt(this.price?.value!),parseInt(this.discound?.value!),this.productImages,this.overview?.value!,[],[]);
      this.ProductService.putProduct(newprd,this.router2.snapshot.params['id'])
      .subscribe(data =>
        {
        this.message=true;
            this.addproductForm.reset();
            this.router.navigate(["/dashboard/productslist"])
            this.productImages='';
            Swal.fire({
          
              title:  'Updated Successfully',
              icon:'success' ,
              showConfirmButton:false,
              timer:1000
              
             })
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
    this.image?.setValidators(Validators.required);

    if(this.productImages.length==0){
      this.image?.setValidators(Validators.required);
    }
    else{
      this.image?.removeValidators(Validators.required);

    }
  
  }
  }
  

