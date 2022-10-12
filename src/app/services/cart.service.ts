import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Cart } from 'Shared Classes and types/model/cart';
import { Product } from 'Shared Classes and types/model/product';
import { userDataRegister } from '../auth/userRegister';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CartItemList:any=[];
  // CartTotal=0;
  url:string="https://dummyjson.com/products";
  url2:string="http://localhost:3000/cart";
  public productList=new BehaviorSubject<any>([]);
    constructor(private http:HttpClient) { }

  getProducts(){
    return this.productList.asObservable();
  }
 
setProduct(prod:any){
this.CartItemList.push(...prod);
this.productList.next(prod)

}

AddtoCartt(product:any){
this.CartItemList.push(product);
this.productList.next(this.CartItemList)
this.getTotalPrice();
console.log(this.CartItemList)

}
getTotalPrice():number{

 let grandTotal=0;
 this.CartItemList.map((a:any)=>{
  grandTotal+=a.total;
 });
return grandTotal;

}
pro:any;

getProductById(prodId:any){
   let data =this.http.get<any>(this.url+"/"+prodId).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
  data.subscribe((result=>{
    this.pro=result;
    console.log(this.pro)
  }))
  let productt={
  "title":this.pro?.title,
  "price":this.pro?.price,
  "discount":this.pro?.discountPercentage,
  "thumbnail":this .pro?.thumbnail,
  "count": 1

  }
  this.saveproduct(productt)
}
  
saveproduct(product:any){
   return this.http.post(this.url2, product )
  
}

//   AddProductToCart(product:any){
//     let productExists=false;
//     for(let i in this.CartItemList)
//       {
//     if(this.CartItemList[i].id === product.id){
//       this.CartItemList.qty++;
//        productExists=true;
//        break;
// }
// }
//}



//Remove product one by one
removeCartData(product: any) {
  this.CartItemList.map((a: any, index: any) => {
    if (product.id === a.id) {
      this.CartItemList.splice(index, 1);
    }
  })
}

// Empties the whole cart
removeAllCart() {
  this.CartItemList = [];
  this.productList.next(this.CartItemList);
}

}