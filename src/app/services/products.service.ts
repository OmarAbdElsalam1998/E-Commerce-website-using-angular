import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  

  constructor(private http:HttpClient) { }
  postProduct(data:any){
    return this.http.post<any>("http://localhost:3000/addproducts/",data)
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/addproducts/")
  }
  putProduct(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/addproducts/"+id,data);
  }
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/addproducts/"+id);
  }
  getaddProductById(id:number){
    return this.http.get<any>("http://localhost:3000/addproducts/"+id)
  }
}
