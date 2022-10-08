import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
   isLoogedSubject:BehaviorSubject<boolean>;
  constructor() {
    this.isLoogedSubject=new BehaviorSubject<boolean> (false);
   }


  logIn(username:string,password:string){
    let token="12345";
    localStorage.setItem("token",token);
    this.isLoogedSubject.next(true);

  }

  logOut(){
    localStorage.removeItem("token");
    this.isLoogedSubject.next(false);

  }


  get isLoogedIn():boolean{
    return (localStorage.getItem("token")?true:false);
  }


  getLoggedStatus(){
    return this.isLoogedSubject;
  }
}
