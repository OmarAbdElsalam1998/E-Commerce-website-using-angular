import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  url="http://localhost:3000/comments";
  constructor(private http:HttpClient) { }

  postComment(comment:any){
    return this.http.post<any>(this.url,comment).pipe(catchError((err)=>{
      return throwError(() => err.message||"internal Server Error" )
    })); 
  }
  
  getCommentForSpecificCustomerAndSpecificProduct(customerId:number,productId:number){
    return this.http.get<any>(this.url+"?userId="+customerId+"&productId="+productId).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }

  getCommentForSpecificProduct(productId:number){
    return this.http.get<any[]>(this.url+"?productId="+productId);
  }
  getAllcomments():Observable<any>
{
 return this.http.get<any[]>(this.url).pipe(catchError((err)=>{
        return throwError(()=>err.message || "Internal Server error");  
       }));
}

updateComment(id:number,comment:any){
  return this.http.put(this.url+"/"+id,comment).pipe(catchError((err)=>{
    return throwError(()=>err.message || "Internal Server error");  
   }));
}
}
