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

    // userRegistering()
    // {
    //   this.http.post<any>("http://localhost:4000/users",this.registerationForm.value)
    //   .subscribe(res=>{
    //           alert("Registeration is Successfull")
    //           this.registerationForm.reset();
    //           this.router.navigate(['login'])
    //         },
    //           error =>{
    //             alert("Registeraion is failed , plz try again with another Email Account")} ,
    //   )
    // }
                
        

  userRegistering()
  {
    console.log(this.registerationForm.value)
    this.userService.postRegData(this.registerationForm.value).subscribe(data =>
      {
      alert("Registeration is Successfull")
          this.registerationForm.reset();
          this.router.navigate([""])},
     error =>{
        console.log("Error" , error)
      }
      
      )

  }


// giveMeData(){
//   this.httpClient.get('assets/sample.json').subscribe((resp)=>{
//   this.var1 = resp;
//   });
//   }

}
