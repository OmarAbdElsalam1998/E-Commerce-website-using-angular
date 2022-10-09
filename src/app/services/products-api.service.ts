import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
 prloader:BehaviorSubject<boolean>;
   url:string="https://dummyjson.com/products";
  constructor(private http:HttpClient) { 
    this.prloader=new BehaviorSubject<boolean>(false)
  }


  getProducts(){
    return this.http.get(this.url);
  }


  
}
