import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';
import { userLogin } from '../userLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title="Sign IN";
  constructor(private titleService:Title , private fB: FormBuilder , private userService : LoginService)   { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
  userLogin : userLogin = new userLogin('','');             //initiat obj from class user.ts

  registerationForm =this.fB.group(
    {
      userName:['',[Validators.required,Validators.maxLength(32),Validators.minLength(3)]],
      userPassword:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9]+){6,32}$")]],

    }
  );

  get userName()
  {
    return this.registerationForm.get('userName')
  }

  get userPassword()
  {
    return this.registerationForm.get('userPassword')

  }
  saveloginData()
  {
    // console.log(this.registerationForm.value)
    // this.userService.postData(this.userLogin).subscribe(data=>{
    //   console.log("Succes" ,data)
    // })
  }

}
