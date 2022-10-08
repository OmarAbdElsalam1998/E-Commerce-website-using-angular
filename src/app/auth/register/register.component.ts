import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../validators/confirmpassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formB : FormBuilder) { }

  ngOnInit(): void {
  }

  registerationForm =this.formB.group(
    {
      username:['',[Validators.required,Validators.maxLength(32),Validators.minLength(5)]],           //call simple validators
      email:['',[Validators.required,Validators.pattern]],
      password:['',[Validators.required,Validators.pattern]],
      confirmpassword:['',Validators.required],

    },
    {validator:[ConfirmPasswordValidator]}               //call Cross field validators (on all form Group not only control)

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


}
