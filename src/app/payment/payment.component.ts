import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsApiService } from '../services/products-api.service';
import { Title } from '@angular/platform-browser';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  ckecked: boolean = false;
  cartItems:any;
  newCartItems:any=[];
  totalPriceOfAllItems=0.0;
  title="payment";

  constructor(private fb: FormBuilder, private router: Router, 
    private ProductService: ProductsApiService,private titleService:Title,
    private cartService:CartService
    
    ) { 
    this.titleService.setTitle(this.title);

    this.cartService.getCartProducts().subscribe(res=>{
      this.cartItems=res;
      console.log(this.cartItems)
      
     
      })
      

    //calculate 
    

  }

  paymentForm:FormGroup = this.fb.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
      Phone: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: [''],
      street: ['', Validators.required],
      subscribewhenreciving: [true],
      subscribe: [false],
      itemsList:["",this.fb.array([])],
      totalPrice:[""]


    });

  ngOnInit(): void {
  }
  get firstname() {
    return this.paymentForm.get('firstname')
  }
  get lastname() {
    return this.paymentForm.get('lastname')
  }
  get email() {
    return this.paymentForm.get('email')
  }
  get Phone() {
    return this.paymentForm.get('Phone')
  }
  get country() {
    return this.paymentForm.get('country')
  }
  get region() {
    return this.paymentForm.get('region')
  }
  get city() {
    return this.paymentForm.get('city')
  }
  get zipcode() {
    return this.paymentForm.get('zipcode')
  }
  get street() {
    return this.paymentForm.get('street')
  }
  get cardholder() {
    return this.paymentForm.get('cardholder')
  }
  get cardnum() {
    return this.paymentForm.get('cardnum')
  }
  get expirationdate() {
    return this.paymentForm.get('expirationdate')
  }
  get cvv() {
    return this.paymentForm.get('cvv')
  }
  get subscribewhenreciving(){
    return this.paymentForm.get("subscribewhenreciving")
  }
  
 ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  for(let data of this.cartItems){
    console.log(data)
    var totalpriceOfoneItem=parseFloat(data.price)-(parseFloat(data.price)*(parseFloat(data.discount)/100))*parseFloat(data.count);
       console.log(totalpriceOfoneItem)
       var obj={image:data.thumbnail,name:data.title,count:data.count,totalPrice:totalpriceOfoneItem}
      this.newCartItems.push(obj);
      this.totalPriceOfAllItems+=totalpriceOfoneItem;
    }
 }
  setvisaValidation() {
    this.ckecked=true;
    
          this.paymentForm.setControl('cardholder', this.fb.control('',[Validators.required])); 
          this.paymentForm.setControl('cardnum', this.fb.control('',[Validators.required])); 
          this.paymentForm.setControl('expirationdate', this.fb.control('',[Validators.required])); 
          this.paymentForm.setControl('cvv', this.fb.control('',[Validators.required])); 
       

      
  }
  resetvisaValidation()
{           this.ckecked=false;

        this.paymentForm.removeControl('cardholder');
        this.paymentForm.removeControl('cardnum');
        this.paymentForm.removeControl('expirationdate');
        this.paymentForm.removeControl('cvv');
}
addorder(){
  this.paymentForm.value.itemsList=this.newCartItems;
  this.paymentForm.value.total=this.totalPriceOfAllItems;
  console.log(this.paymentForm.value);
  this.ProductService.saveorder(this.paymentForm.value)
    .subscribe(data => {
      alert("your Order done Successfully")
      this.paymentForm.reset();
      this.router.navigate([""])
    },
      error => {
        console.log("Error", error)
      }

    )
}

 
  }

