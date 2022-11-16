import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url:string="http://localhost:3000/addproducts/";
  productList = new BehaviorSubject<any>([]);

  constructor(private http:HttpClient) { }
  postProduct(data:any){
    return this.http.post<any>(this.url,data)
  }
  getProduct(){
    return this.http.get<any>(this.url)
  }
  putProduct(data:any,id:number){
    return this.http.put<any>(this.url+id,data);
  }
  deleteProduct(id:number){
    return this.http.delete<any>(this.url+id);
  }
  getaddProductById(id:number){
    return this.http.get<any>(this.url+id)
  }
  getProductData() {
    return this.productList.asObservable();
  }
}
