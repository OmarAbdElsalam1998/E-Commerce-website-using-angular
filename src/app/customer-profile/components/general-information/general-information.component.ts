import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AdminRoleService } from 'src/app/services/admin-role.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Address } from 'src/app/shares classes/address';
import { GeneralInfo } from 'src/app/shares classes/generalInfo';
import { UserRole } from 'src/app/shares classes/userRole';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {
  customerID:any;
  generalInfo = new GeneralInfo("","","","","")
  address = new Address("","","")
  addressList:any;
  userAddID:any;
  currentUser:any;
  closeForm:boolean=true;


  constructor( private userAuth:UserAuthService , private adminRole:AdminRoleService,private customer:CustomerService , private fb:FormBuilder,private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

    //get userID
    this.userAuth.getUserId().subscribe(data =>{
      this.customerID=data;
      console.log(" Get ID profile ",this.customerID)

      //get OldUserData by ID
      this.adminRole.getUserById(this.customerID).subscribe(
        data =>{
          this.currentUser=data;
          console.log(this.currentUser)
          this.loadProfileData();

        }
      )
    })    
  }

   // get generaldata from API
   loadProfileData()
  {
      // if(this.currentUser.generalInfo.userName)
      {
        this.addProfileForm.controls['userName'].setValue(this.currentUser.generalInfo['userName'])
        this.addProfileForm.controls['lastName'].setValue(this.currentUser.generalInfo['lastName'])
        this.addProfileForm.controls['userEmail'].setValue(this.currentUser.generalInfo['userEmail'])
        this.addProfileForm.controls['phone'].setValue(this.currentUser.generalInfo['phone'])
        this.addProfileForm.controls['DateOfBirth'].setValue(this.currentUser.generalInfo['DateOfBirth'])
        console.log(this.currentUser.generalInfo)
      }; 


  }


  addProfileForm=this.fb.group(
    {
    userName:['',[Validators.required,Validators.maxLength(32),Validators.minLength(3)]],           //call simple validators
    lastName:['',[Validators.required,Validators.maxLength(32),Validators.minLength(3)]],           //call simple validators
    userEmail:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
    phone:[,[Validators.required,Validators.maxLength(11),Validators.minLength(11)]],           //call simple validators
    DateOfBirth:['',[Validators.required,Validators.pattern("")]],
    })

    addAddressForm=this.fb.group(
      {
      country:['',[Validators.required,Validators.maxLength(100),Validators.minLength(5)]],           //call simple validators
      city:['',[Validators.required,Validators.maxLength(100),Validators.minLength(5)]],           //call simple validators
      address:['',[Validators.required,Validators.maxLength(200),Validators.minLength(10)]],
      })

  saveProfile(id:any)
  {
    var profile= new GeneralInfo (this.addProfileForm.value.userName!, this.addProfileForm.value.lastName!,this.addProfileForm.value.userEmail!,
      this.addProfileForm.value.phone,this.addProfileForm.value.DateOfBirth!)

    var addlist= new UserRole(this.currentUser.userName,this.currentUser.lastName,this.currentUser.userEmail,this.currentUser.phone,
      this.currentUser.Password,this.currentUser.role,this.currentUser.addresses,profile,this.currentUser.image,
      this.currentUser.responsability);

    this.customer.putUser(addlist,this.customerID).subscribe(
      data =>{
        console.log(data);
        this.addAddressForm.reset()
      })
      let add = document.getElementById('addAddress');
      add?.click();
      Swal.fire({
        title:"Profile Info changed Successfully",
        icon:'success' ,
        showConfirmButton:false,
        timer:1000
       })
  }

  cancelProfile()
  {
    // this.addProfileForm.close();
    let close = document.getElementById('closeProfile');
        close?.click();
        Swal.fire({
        
          title:"changes not saved ",
          icon:'success' ,
          showConfirmButton:false,
          timer:1000
          
         })
  }

   //update address
  // saveAddressChanges(id:any)
  // {
  //   var address= new Address (this.addAddressForm.value.country!, this.addAddressForm.value.city!,this.addAddressForm.value.address!)

  //   this.customer.putAddress(address,id).subscribe(
  //     data =>{
  //       address=data;
  //       console.log(data);
  //       this.addProfileForm.reset();
  //     }
  //   )

  //   let save = document.getElementById('updateAdd');
  //     save?.click();
  //     Swal.fire({
      
  //       title:"Profile Info changed Successfully",
  //       icon:'success' ,
  //       showConfirmButton:false,
  //       timer:1000
        
  //      })
  // }

  //add new address
  arr: Address[]=[];
  addAddress() {
    var address= new Address (this.addAddressForm.value.country!, this.addAddressForm.value.city!,this.addAddressForm.value.address!)
    this.arr=[...this.currentUser.addresses]
    this.arr.push(address)
    var addlist= new UserRole(this.currentUser.userName,this.currentUser.lastName,this.currentUser.userEmail,this.currentUser.phone,
      this.currentUser.Password,this.currentUser.role,this.arr,this.currentUser.generalInfo,this.currentUser.image,
      this.currentUser.responsability);

    this.customer.putUser(addlist,this.customerID).subscribe(
      data =>{
        console.log(data);
        this.addAddressForm.reset()
      })
      let add = document.getElementById('addAddress');
      add?.click();
      this.closeForm=true;
      Swal.fire({
        title:"Profile Info changed Successfully",
        icon:'success' ,
        showConfirmButton:false,
        timer:1000
       })
  }
  openFormToAddAddress()
  {
    this.closeForm=false;
  }

  get userName()
  {
    return this.addProfileForm.get('userName');
  }
  get lastName()
  {
    return this.addProfileForm.get('lastName');
  }
  get userEmail()
  {
    return this.addProfileForm.get('userEmail');
  }
  get phone()
  {
    return this.addProfileForm.get('phone');
  }
  get DateOfBirth()
  {
    return this.addProfileForm.get('DateOfBirth');
  }
  get country()
  {
    return this.addAddressForm.get('country');
  }
  get city()
  {
    return this.addAddressForm.get('city');
  }
  get addressForm()
  {
    return this.addAddressForm.get('address');
  }

}
