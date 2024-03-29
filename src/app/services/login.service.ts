import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { userLogin } from '../auth/userLogin';
import {userDataRegister} from '../auth/userRegister'
import { map } from 'jquery';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { UserRole } from '../shares classes/userRole';
// import * as data from '../Server/dB.json';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Loginloader:BehaviorSubject<boolean>;

  constructor(private http : HttpClient) {
    this.Loginloader=new BehaviorSubject<boolean>(false);
   }
  // _url:string="dB.json/save";

  _url:string="https://market-api.glitch.me/users";

  // ErrorMessage:string="";
  // dBfile:any={};



  getLogData()
  {
    return this.http.get(this._url ).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }

  postRegData(user:UserRole)
  {
    return this.http.post(this._url, user)
  }


  // postData(user:userLogin)
  // {
  //   fetch('src/app/dB.json/save')
  //   .then((response)=>{return response.json()})
  //   .then((data)=>{
  //       // console.log(data)
  //       this.http.post("dBfile", data);
  //   })
  //   .catch((err)=>{
  //       // console.log(err)
  //       this.http.post("ErrorMessage" , err)
  //   })    
  // }

// getDataFromDB()
// {
//   this.http.get('src/app/dB.json').subscribe((resp)=>{
//     this.dBfile = resp;
// })
// }

  // getData()
  // {
  //   return this.http.get(this._url,userLogin)
  // }


}
