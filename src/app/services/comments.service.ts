import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get<any>(this.url+"?productId="+productId);
  }
}
