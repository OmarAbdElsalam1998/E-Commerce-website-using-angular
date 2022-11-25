import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserRole } from 'src/app/shares classes/userRole';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { userDataRegister } from '../userRegister';
import { ConfirmPasswordValidator } from '../validators/confirmpassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private titleService:Title ,private formB : FormBuilder ,private userAuth:UserAuthService,
    private http : HttpClient, private userService : LoginService , private router:Router,private location:Location) { }
  title="Sign UP";
  

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

  }

  registerationForm =this.formB.group(
    {
      username:['',[Validators.required,Validators.pattern("^[a-zA-Z]{3,32}$")]],           //call simple validators
      email:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
      password:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9_-]{6,32}$")]],
      confirmpassword:[''],
      role:['customer'],

    } ,{validator:[ConfirmPasswordValidator,Validators.required]}                  //call Cross field validators (on all form Group not only control)

  );

  get username()
  {
    return this.registerationForm.get('username')
  }

   get email()
  {
    return this.registerationForm.get('email')
  }

  get password()
  {
    return this.registerationForm.get('password')
  }

  get confirmPassword()
  {
    return this.registerationForm.get('confirmpassword')
  }    
        

  userRegistering()
  {
    console.log(this.registerationForm.value)
    var user =new UserRole(this.registerationForm?.value.username!,"",this.registerationForm?.value.email!,"",this.registerationForm?.value.password!,"customer",[],"",'',[]);
    this.userService.postRegData(user).subscribe(data =>
      {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registered Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate([""]);

          
        // this.usersArr=data;
      },
      error =>
        {
          console.log("Error")
        }
        )
      }

        
  

}
