import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  url="http://localhost:3000/comments";
  constructor(private http:HttpClient) { }


  getCommentForSpecificCustomerAndSpecificProduct(customerId:number,productId:number){
    return this.http.get<any>(this.url+"?userId="+customerId+"&productId="+productId);
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
}
