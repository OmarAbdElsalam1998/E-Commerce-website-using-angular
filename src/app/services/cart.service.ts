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
  url:string="https://market-api.glitch.me/addproducts";
  url2:string="https://market-api.glitch.me/cart";
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

getProductformCartbyId(proId:any){
  return this.http.get<any>(this.url2+"/"+proId).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
}
getProductById(prodId:any){
   return this.http.get<any>(this.url+"/"+prodId).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
  
}
UpdateCart(productID:any,product:any){
  return this.http.put(this.url2+"/"+productID,product).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
}
// saveproduct(product:Cart){
//   var headers= new HttpHeaders().set("Content-Type", "procademy");

//   this.CartProductsCounter.next(this.CartProductsCounter.value+1)
//    console.log(this.CartProductsCounter);  
//       return this.http.post(this.url2,product).pipe(catchError ((err)=>{
//       return throwError (()=>console.log(err))}))
  
  
// }
UpdateCartForSpecificCustomer(cartId:any,customerCart:any){
  return this.http.put(this.url2+"/"+cartId,customerCart).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
}

saveproduct(cartItemsForSpecificCustomer:any){
  var headers= new HttpHeaders().set("Content-Type", "procademy");

  this.CartProductsCounter.next(this.CartProductsCounter.value+1)
   console.log(this.CartProductsCounter);  
      return this.http.post(this.url2,cartItemsForSpecificCustomer).pipe(catchError ((err)=>{
      return throwError (()=>console.log(err))}))
  
  
}



//GetCartItems For Specific Customer

getCartItemsForSpecificCustomer(UserId:number){
  return this.http.get(this.url2+"?customerId="+UserId).pipe(catchError ((err)=>{
    return throwError (()=>console.log(err))}))
}


//increase Cart Counter
setCartCounter(value:number){
  this.CartProductsCounter.next(value)

}


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