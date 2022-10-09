import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { userDataRegister } from '../userRegister';
import { ConfirmPasswordValidator } from '../validators/confirmpassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private titleService:Title ,private formB : FormBuilder) { }
  title="Sign UP";
  userRegister : userDataRegister = new userDataRegister('','','','','');             //initiat obj from class user.ts


  ngOnInit(): void {
    this.titleService.setTitle(this.title);

  }

  registerationForm =this.formB.group(
    {
      username:['',[Validators.required,Validators.maxLength(32),Validators.minLength(5)]],           //call simple validators
      email:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
      password:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9_-]{6,32}$")]],
      confirmpassword:[''],

    },
    {validator:[ConfirmPasswordValidator,Validators.required]}                    //call Cross field validators (on all form Group not only control)

  );

  get userName()
  {
    return this.registerationForm.get('username')
  }

   get userEmail()
  {
    return this.registerationForm.get('email')
  }

  get Password()
  {
    return this.registerationForm.get('password')
  }

  get confirmPassword()
  {
    return this.registerationForm.get('confirmpassword')
  }

  userRegistering()
  {
    // console.log(this.registerationForm.value)
  }

}
