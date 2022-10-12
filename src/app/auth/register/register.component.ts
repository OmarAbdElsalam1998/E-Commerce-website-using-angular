import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from '../login/login.component';
import { userDataRegister } from '../userRegister';
import { ConfirmPasswordValidator } from '../validators/confirmpassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private titleService:Title ,private formB : FormBuilder ,private http : HttpClient, private userService : LoginService , private router:Router) { }
  title="Sign UP";
  userRegister : userDataRegister = new userDataRegister("","","","","User");             //initiat obj from class user.ts
  

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

  }

  registerationForm =this.formB.group(
    {
      username:['',[Validators.required,Validators.maxLength(32),Validators.minLength(5)]],           //call simple validators
      email:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
      password:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9_-]{6,32}$")]],
      confirmpassword:[''],
      role:['user'],

    },
    {validator:[ConfirmPasswordValidator,Validators.required]}                    //call Cross field validators (on all form Group not only control)

  );

  get userName()
  {
    return this.registerationForm.get('userName')
  }

   get userEmail()
  {
    return this.registerationForm.get('userEmail')
  }

  get Password()
  {
    return this.registerationForm.get('Password')
  }

  get confirmPassword()
  {
    return this.registerationForm.get('confirmPassword')
  }    
        

  usersArr:any;

  userRegistering()
  {
    console.log(this.registerationForm.value)
    this.userService.postRegData(this.registerationForm.value).subscribe(data =>
      {
        console.log(data)
        this.registerationForm.reset();
        this.router.navigate([""]);
          
        // this.usersArr=data;
      },
      error =>
        {
          console.log("Error")
        }
        )
      }

        // let checkUser=this.usersArr?.filter((input:any)=>
        // input.email == this.userEmail?.value && input.password == this.Password?.value
        //   )

        // console.log(checkUser)
        // if(this.registerationForm.valid){
        //   alert("Hello" + this.registerationForm.value.userName + "Registeration is Successfull");
        //     this.registerationForm.reset();
        //     this.router.navigate([""])
        //   }

        //   else
        //   { 
        //     alert("Registertraion is failed , Plz try another account as not registered before")
        //   }        
      
        // }
  

}
