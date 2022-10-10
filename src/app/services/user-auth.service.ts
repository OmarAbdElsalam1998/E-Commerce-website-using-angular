import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
   isLoogedSubject:BehaviorSubject<boolean>;
   isAdminSubject:BehaviorSubject<boolean>;
   loader:BehaviorSubject<boolean>;
   userName:BehaviorSubject<string>;

  constructor() {
    this.isLoogedSubject=new BehaviorSubject<boolean> (false);
    this.isAdminSubject=new BehaviorSubject<boolean> (false);
    this.loader=new BehaviorSubject<boolean>(false);
    this.userName=new BehaviorSubject<string>("");
   }


  logIn(username:any,password:string,role:string){
    let token="12345";
    localStorage.setItem("token",token);
    this.isLoogedSubject.next(true);
    this.isAdminSubject.next(false);
    console.log(username);
    this.userName.next(username)
    if(role=="admin"){
      console.log("from admin");
      this.isAdminSubject.next(true);
    }

  }
  
  logOut(){
    localStorage.removeItem("token");
    this.isLoogedSubject.next(false);
    this.isAdminSubject.next(false);
    this.userName.next("");


  }


  get isLoogedIn():boolean{
    return (localStorage.getItem("token")?true:false);
  }


  getLoggedStatus(){
    return this.isLoogedSubject;
  }

  getIsAdminStatus(){
    return this.isAdminSubject;
  }
  getUsername(){
    return this.userName;
  }

}
