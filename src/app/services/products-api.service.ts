import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {


  productList = new BehaviorSubject<any>([]);
  items:any[] = [];
 prloader:BehaviorSubject<boolean>;
   url:string="https://dummyjson.com/products";
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


//  addToCart(product: any) {
//    this.items.push(product);
//     localStorage.setItem('session',JSON.stringify(product));
//     console.log(localStorage.getItem('session'));
//     this.saveCart();
//  }

// Add products to cart
 addToCart(product: any) {
  this.items.push(product);
  this.productList.next(this.items);
  console.log(this.items);
  ////store local Storage
  localStorage.setItem('session',JSON.stringify(product));
   console.log(localStorage.getItem('session'));
  this.saveCart();
}

getProductData() {
  return this.productList.asObservable();
}
 itemInCart(product: any) {
   return this.items.findIndex(o => o.ID === product.ID) > -1;
 }
 getItems() {
   return this.items;

 }


 saveCart(): void {
   localStorage.setItem('session', JSON.stringify(this.items)); 
 }





 // Remove product one by one
 removeCartData(product: any) {
  this.items.map((a: any, index: any) => {
    if (product.id === a.id) {
      this.items.splice(index, 1);
    }
  })
}

// Empties the whole cart
removeAllCart() {
  this.items = [];
  this.productList.next(this.items);
}

}
