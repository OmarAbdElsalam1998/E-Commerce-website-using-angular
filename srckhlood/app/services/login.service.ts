import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { userLogin } from '../auth/userLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }
  _url:string="";

  postData(user:userLogin)
  {
    return this.http.post(this._url, user)
  }

}
