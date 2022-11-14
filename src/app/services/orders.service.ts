import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { order } from '../shares classes/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url:string="http://localhost:3000/orders";
  constructor(private http:HttpClient) { }

  getOrders(){
    return this.http.get<any>(this.url).pipe(catchError((err)=>{
     return throwError (()=>err.message ||"internal server error")
   }));

  
   
 }
 deletOrder(id:number){
  return this.http.delete(this.url+"/"+id).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
 }
 getOrdersById(id:number){
  return this.http.get<any>(this.url+"/"+id).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
 }


 //getOrders  for sepecific Customer
 getOrdersForSpecificCustomer(customerId:number){
  return this.http.get<any>(this.url+"?userId="+customerId).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
 } 

 //get Order by Specific Status

 getOrderByStatus(status:string){
  return this.http.get<any>(this.url+status).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
 }

 //ChangeOrder Status
 
 updateStatus(order:any,id:number){
  
    var httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json-patch+json'}),
    
      
   }
  return this.http.put(this.url+"/"+id,order).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error");
  }));
 }

 
}
