import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsApiService } from '../services/products-api.service';
import { Title } from '@angular/platform-browser';
import { CartService } from '../services/cart.service';
import { UserAuthService } from '../services/user-auth.service';
import { AdminRoleService } from '../services/admin-role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  ckecked: boolean = false;
  cartItems:any;
  newCartItems:any=[];
  subTotalPrice=0;
  ShippingCharge:number=25;
  currentUserid:any;
  totalPriceOfAllItems=this.subTotalPrice+this.ShippingCharge;
  title="payment";

  constructor(private fb: FormBuilder, private router: Router, 
    private ProductService: ProductsApiService,private titleService:Title,
    private cartService:CartService,private userAuth:UserAuthService,
    private customer:AdminRoleService
    
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
      userId:[''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
      Phone: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: [''],
      street: ['', Validators.required],
      subscribewhenreciving: [false],
      subscribe: [false],
      paymentMethod:[''],
      orderStatus:["WaitingForReview"],
      itemsList:["",this.fb.array([])],
      createdAt:[''],
      subTotalPrice:[""],
      shippingCharge:[25],
      totalPrice:[''],
      



    });

  ngOnInit(): void {
    this.userAuth.getUserId().subscribe(id=>{
      this.currentUserid=id;
      this.customer.getUserById(this.currentUserid).subscribe(res=>{
        console.log(res.addresses[0]);
        this.paymentForm.controls['firstname'].setValue(res.generalInfo.userName);
        this.paymentForm.controls['lastname'].setValue(res.generalInfo.lastName);
        this.paymentForm.controls['email'].setValue(res.generalInfo.userEmail);
        this.paymentForm.controls['Phone'].setValue(res.generalInfo.phone);
        this.paymentForm.controls['country'].setValue(res.addresses[0].country);
        this.paymentForm.controls['city'].setValue(res.addresses[0].city);
        this.paymentForm.controls['region'].setValue(res.addresses[0].city);

        this.paymentForm.controls['street'].setValue(res.addresses[0].address);

    

      });

    })

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
    if(data.discount>0){
      var totalpriceOfoneItem=(parseFloat(data.price)-(parseFloat(data.price)*(parseFloat(data.discount)/100)))*parseFloat(data.count);
       console.log(totalpriceOfoneItem)
       var obj={productId:data.productId,image:data.thumbnail,name:data.title,count:data.count,totalPrice:totalpriceOfoneItem}
      this.newCartItems.push(obj);
      this.subTotalPrice+=totalpriceOfoneItem;
      this.totalPriceOfAllItems+=totalpriceOfoneItem;
    }
    else{
      var totalpriceOfoneItem=parseFloat(data.price)*parseFloat(data.count);
      console.log(totalpriceOfoneItem)
      var obj={productId:data.productId,image:data.thumbnail,name:data.title,count:data.count,totalPrice:totalpriceOfoneItem}
     this.newCartItems.push(obj);
     this.subTotalPrice+=totalpriceOfoneItem;
     this.totalPriceOfAllItems+=totalpriceOfoneItem;
    }
      
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
  this.paymentForm.value.subTotalPrice=this.subTotalPrice;
  this.paymentForm.value.totalPrice=this.subTotalPrice+this.ShippingCharge;
  this.paymentForm.value.userId=this.userAuth.getUserId().value;
  this.paymentForm.value.createdAt=Date.now();
  if(this.subscribewhenreciving){
    this.paymentForm.value.paymentMethod="payWhenReceive";
  }
  else{
    this.paymentForm.value.paymentMethod="visa";

  }
  console.log(this.paymentForm.value);
  this.ProductService.saveorder(this.paymentForm.value)
    .subscribe(data => {
      Swal.fire({
        
        title: 'Done',
        icon:'success' ,
        showConfirmButton:false,
        timer:1000
        
       })
      this.paymentForm.reset();
      // this.cartService.getCartProducts().subscribe(res=>{
      //   res.forEach((item:any)=>{
      //     this.cartService.DeleteItemFromCart(item.id);
      //   })
        
        
       
      //   })
      this.router.navigate([""])
      console.log(this.cartItems.id);
      // this.cartService.DeleteItemFromCart(this.cartItems.id);
    },
      error => {
        console.log("Error", error)
      }

    )
}

 
  }

