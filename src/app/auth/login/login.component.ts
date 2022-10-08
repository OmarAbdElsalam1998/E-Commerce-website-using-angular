import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title="Sign IN";
  constructor(private titleService:Title , private fB: FormBuilder) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  registerationForm =this.fB.group(
    {
      userName:['',[Validators.required,Validators.maxLength(32),Validators.minLength(3)]],
      userPassword:['',[Validators.required,Validators.pattern]],

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


}
