import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { userLogin } from '../userLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title="Sign IN";

  constructor(private titleService:Title , private fB: FormBuilder , private userService : LoginService ,private router: Router)   { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
  userLogin : userLogin = new userLogin('','');             //initiat obj from class user.ts

  loginForm =this.fB.group(
    {
      userEmail:['',[Validators.required,Validators.maxLength(32),Validators.minLength(3)]],
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
    let checkUser=this.usersArr?.filter((user:any)=>
    user.email== this.userEmail?.value && user.password ==this.userPassword?.value
    )
    console.log(checkUser)
    if(checkUser)
    this.router.navigate([""])

  }

}
