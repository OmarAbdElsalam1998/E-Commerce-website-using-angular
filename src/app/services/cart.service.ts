import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'Shared Classes and types/model/cart';
import { Product } from 'Shared Classes and types/model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }


//   getCartItem():Observable<Cart[]>{
//     return this.http.get<Cart[]>(cartUrl);
//   }
//   addProductToCart(product:Product):Observable<any>{
// return this.http.post(cartUrl,{product})

//   }
}
