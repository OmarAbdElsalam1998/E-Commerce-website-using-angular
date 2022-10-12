import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Product } from 'Shared Classes and types/model/product';
import { userDataRegister } from '../auth/userRegister';
import { Cart } from '../shares classes/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartLoader:BehaviorSubject<boolean>;
  CartItemList:any;
  CartProductsCounter:BehaviorSubject<number>;
  cartProducts:BehaviorSubject<any>;
  // CartTotal=0;
  url:string="https://dummyjson.com/products";
  url2:string="http://localhost:3000/cart";
  //  headers:HttpHeaders; 
  public productList=new BehaviorSubject<any>([]);
    constructor(private http:HttpClient) { 
      this.cartLoader= new BehaviorSubject<boolean>(false);
      this.cartProducts=new BehaviorSubject<any>([]);
      this.CartProductsCounter=new BehaviorSubject<number>(-1);
      this.cartProducts.subscribe(res=>{
        this.CartProductsCounter.next(res.length);
        console.log(this.CartProductsCounter)
       })
     

    }

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

getProductFromCart(){
   this.http.get(this.url2).subscribe(res=>{
    this.cartProducts.next(res);

   });
}
getCartProducts(){
  this.getProductFromCart();
  return this.cartProducts;
}
getCartProductsCounter(){
   this.getCartProducts();
   return  this.CartProductsCounter;
}

DeleteItemFromCart(id:number){
  this.http.delete(this.url2+"/"+id).subscribe(res=>{
    console.log(res);
  })
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
   return this.http.get<any>(this.url+"/"+prodId).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
  
}
  
saveproduct(product:Cart){
  var headers= new HttpHeaders().set("Content-Type", "procademy");

  this.CartProductsCounter.next(this.CartProductsCounter.value+1)
   console.log(this.CartProductsCounter);  
      return this.http.post(this.url2,product).pipe(catchError ((err)=>{
      return throwError (()=>console.log(err))}))
  
  
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