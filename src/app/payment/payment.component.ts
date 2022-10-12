import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsApiService } from '../services/products-api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  ckecked: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private ProductService: ProductsApiService) { }

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


    });
    // noteForm:FormGroup=this.fb.group({

    //   name:['',[Validators.required,forbiddenNameValidator(/admin/)]],
  
    //   product:[''],
  
    //   discount:[false],
  
    //   comment:[''],
  
    //   alternativeComments:this.fb.array([])
  
  
  
  
    // });
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
  
  clicked() {
    this.ckecked = !this.ckecked;
  }
  setvisaValidation() {
    this.paymentForm.get('subscribe')?.valueChanges.subscribe(
      checkedValue => {
        if (checkedValue) {
          this.paymentForm.setControl('cardholder', this.fb.control('',[Validators.required])); 
          this.paymentForm.setControl('cardnum', this.fb.control('',[Validators.required])); 
          this.paymentForm.setControl('expirationdate', this.fb.control('',[Validators.required])); 
          this.paymentForm.setControl('cvv', this.fb.control('',[Validators.required])); 
        }
        else {
          this.paymentForm.removeControl('cardholder');
          this.paymentForm.removeControl('cardnum');
          this.paymentForm.removeControl('expirationdate');
          this.paymentForm.removeControl('cvv');

        }

      }
    )
  }
 

addorder(){
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
