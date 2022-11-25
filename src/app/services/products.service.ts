import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url:string="http://localhost:3000/addproducts";
  productList = new BehaviorSubject<any>([]);
  searchResult:BehaviorSubject<any>;


  constructor(private http:HttpClient) {
    this.searchResult=new BehaviorSubject<any>([]);

   }
  postProduct(data:any){
    return this.http.post<any>(this.url,data)
  }
  getProduct(){
    return this.http.get<any>(this.url)
  }
  putProduct(data:any,id:number){
    return this.http.put<any>(this.url+"/"+id,data);
  }
  deleteProduct(id:number){
    return this.http.delete<any>(this.url+"/"+id);
  }
  getaddProductById(id:number){
    return this.http.get<any>(this.url+"/"+id)
  }
  getProductData() {
    return this.productList.asObservable();
  }

  Getproductsbycategories(cat:string){
    return this.http.get<any>(this.url+"?category="+cat).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }
  GetproductsbySubcategories(cat:string){
    return this.http.get<any>(this.url+"?subCategory="+cat).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }
  
  searchData(keyword:any){
       var data=this.http.get<any>(this.url+"?q="+keyword).pipe(catchError((err)=>{
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
