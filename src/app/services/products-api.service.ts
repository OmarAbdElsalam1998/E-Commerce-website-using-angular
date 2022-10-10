import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
 prloader:BehaviorSubject<boolean>;
 searchResult:BehaviorSubject<any>;
   url:string="https://dummyjson.com/products";
  constructor(private http:HttpClient) { 
    this.prloader=new BehaviorSubject<boolean>(false)
    this.searchResult=new BehaviorSubject<any>([1,2,3]);
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

  
  searchData(keyword:any){
       var data=this.http.get<any>(this.url+"/search?q="+keyword).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
    data.subscribe(value=>{
      this.searchResult.next(value)
    })
    console.log(this.searchResult)
  }
  getsearchResultData(){
     return this.searchResult;
  }
}

