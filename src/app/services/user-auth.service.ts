import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Address } from '../shares classes/address';
import { GeneralInfo } from '../shares classes/generalInfo';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
   isLoogedSubject:BehaviorSubject<boolean>;
   isAdminSubject:BehaviorSubject<boolean>;
   userId:BehaviorSubject<number>;
   loader:BehaviorSubject<boolean>;
   userName:BehaviorSubject<string>;


   url="http://localhost:3000/users";
   generalInfo = new GeneralInfo("","","","","")
   address = new Address("","","")



   constructor(private http:HttpClient) {
    this.isLoogedSubject=new BehaviorSubject<boolean> (false);
    this.isAdminSubject=new BehaviorSubject<boolean> (false);
    this.loader=new BehaviorSubject<boolean>(false);
    this.userName=new BehaviorSubject<string>("");
    this.userId=new BehaviorSubject<number>(-1);

   }


  logIn(id:number,username:any,password:string,role:string){
    let token="12345";
//    localStorage.setItem("token",token);
    this.isLoogedSubject.next(true);
    this.isAdminSubject.next(false);
    this.userId.next(id);
    console.log(username);
    this.userName.next(username)
    if(role=="admin"){
      console.log("from admin");
      this.isAdminSubject.next(true);
    }

  }
  
  logOut(){
    //localStorage.removeItem("token");
    this.isLoogedSubject.next(false);
    this.isAdminSubject.next(false);
    this.userName.next("");
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logged Out  Successfully',
      showConfirmButton: false,
      timer: 1500
    })


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

  getUserId(){
    return this.userId;
  }

   //add new profile
   getInfo() :Observable<any>
   {
    return this.http.get(this.url)
    .pipe(catchError((err)=>{
      return throwError(() => err.message||"internal Server Error" )
    })) 
   }
  
}
