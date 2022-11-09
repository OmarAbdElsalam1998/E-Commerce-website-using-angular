import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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
}
