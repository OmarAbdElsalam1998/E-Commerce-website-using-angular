import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GeneralInfo } from '../shares classes/generalInfo';
import { UserRole } from '../shares classes/userRole';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleService {

  constructor(private http:HttpClient ) { }

  url="http://localhost:3000/users";

  // userRole :UserRole = new UserRole("","","","","","",,"","",[])


    //get ALL users
  getAllUsers():Observable<any>
  {
    return this.http.get<any>(this.url)
    .pipe(catchError((err)=>{
      return throwError(() => err.message||"internal Server Error" )
    })) 
  }
    //get user by ID
  getUserById(userId:any):Observable<any>
  {
    return this.http.get(this.url+"/"+userId)
    .pipe(catchError((err)=>{
      return throwError(() => err.message||"internal Server Error" )
    })) 
  }

     //get admins
     getAdmins():Observable<any>
     {
       return this.http.get(this.url+"?role=admin")
       .pipe(catchError((err)=>{
         return throwError(() => err.message||"internal Server Error" )
       })) 
     }
 //get admins
 getCustomers():Observable<any>
 {
   return this.http.get(this.url+"?role=customer")
   .pipe(catchError((err)=>{
     return throwError(() => err.message||"internal Server Error" )
   })) 
 }


   //create new user 
   postUser(user:any):Observable<any>
   {
    return this.http.post(this.url,user)
    .pipe(catchError((err)=>{
      return throwError(() => err.message||"internal Server Error" )
    })) 
   }

    //update user by put
    putUser(user:UserRole ,id:any):Observable<any>
   {
   
    return this.http.put(this.url+"/"+id, user)
    .pipe(catchError((err)=>{
      return throwError(() => err.message||"internal Server Error" )
    })) 
   }

   //patch method
  //  patchRequest(user:UserRole):Observable<any>
  // {
  //   return this.http.patch(this.url +"/"+user.id, user)
  //   .pipe(catchError((err)=>{
  //     return throwError(() => err.message||"internal Server Error" )
  //   })) 
 
  // }

    //delete by one user
   deleteUser(id:any):Observable<any>
   {
    return this.http.delete(this.url+"/"+id)
    .pipe(catchError((err)=>{
      return throwError(() => err.message||"internal Server Error" )
    })) 
   }

   deleteProductFromCart(id:any):Observable<any>
   {
     return this.http.delete(this.url+"/"+id)
   }

    //delete ALL users
   deleteAllUser():Observable<any>
   {
    return this.http.delete(this.url+"/")
    .pipe(catchError((err)=>{
      return throwError(() => err.message||"internal Server Error" )
    })) 
   }

  
}
