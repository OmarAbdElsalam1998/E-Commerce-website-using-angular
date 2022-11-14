import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { userLogin } from '../userLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title="Sign IN";
  errorLogin=false;

  constructor(
    private titleService:Title ,
     private fB: FormBuilder ,
      private userService : LoginService ,
      private router: Router,
      private userAuth:UserAuthService,
      private location:Location)   { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    //get user data from api
    this.userService.getLogData().subscribe(data=>{             
      console.log(data)
      this.usersArr=data;
     
    },
    error => {
      console.log("Fail login")
    }
    )
  }
  userLogin : userLogin = new userLogin('','');             //initiat obj from class user.ts

  loginForm =this.fB.group(
    {
      userEmail:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
      userPassword:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9]+){6,32}$")]],

    }
  );

  get userEmail()
  {
    return this.loginForm.get('userEmail')
  }

  get userPassword()
  {
    return this.loginForm.get('userPassword')

  }
  
  usersArr:any;


  saveloginData()
  {
    // console.log(this.loginForm.value)

      this.userService.getLogData().subscribe(data=>{             
      console.log(data)
      this.usersArr=data;
     
    },
    error => 
    {
      console.log("Fail login")
    }
    )
    
    var checkUser=this.usersArr?.filter((user:any)=>
    user.userEmail== this.userEmail?.value && user.Password ==this.userPassword?.value
    )
    console.log(checkUser)
    console.log(this.userAuth.getLoggedStatus());

    if(checkUser.length>0){

      console.log(checkUser[0])
      this.userAuth.logIn(checkUser[0].id, checkUser[0].userName ,checkUser[0].Password,checkUser[0].role);
      console.log(this.userAuth.getLoggedStatus());
      this.location.back();


    }
    else{
          this.errorLogin=true;
    }

    



  }

}
