import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
 prloader:BehaviorSubject<boolean>;
   url:string="https://dummyjson.com/products";
   url2:string="https://dummyjson.com/products/categories";
  constructor(private http:HttpClient) { 
    this.prloader=new BehaviorSubject<boolean>(false)
  }


  getAllProducts(){
    return this.http.get<any>(this.url).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }
  getProductById(prodId:any){
    return this.http.get<any>(this.url+"/"+prodId).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }

  search(keyword:any){
    return this.http.get<any>(this.url+"/search?q="+keyword).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }
  Getallproductscategories()
  {
return this.http.get<any>(this.url2).pipe(catchError((err)=>{
  return throwError (()=>err.message ||"internal server error")
}));
  }

  Getallproductsbrand(prodbrand:any){
    return this.http.get<any>(this.url+"/"+prodbrand).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }

}
