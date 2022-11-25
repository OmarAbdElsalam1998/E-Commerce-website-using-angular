import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Product } from 'Shared Classes and types/model/product';
import { userDataRegister } from '../auth/userRegister';
import { Cart } from '../shares classes/cart';
import { Favourite } from '../shares classes/favourite';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  cartLoader:BehaviorSubject<boolean>;
  favouriteItemList:any;
  favouriteProductesCounter:BehaviorSubject<number>;
  favouriteProductes:BehaviorSubject<any>;
  // CartTotal=0;
  url:string="http://localhost:3000/addproducts";
  url2:string="http://localhost:3000/favourite";
  //  headers:HttpHeaders; 
  public productList=new BehaviorSubject<any>([]);
    constructor(private http:HttpClient) { 
      this.cartLoader= new BehaviorSubject<boolean>(false);
      this.favouriteProductes=new BehaviorSubject<any>([]);
      this.favouriteProductesCounter=new BehaviorSubject<number>(-1);
      this.favouriteProductes.subscribe(res=>{
        this.favouriteProductesCounter.next(res.length);
        console.log(this.favouriteProductesCounter)
       })
     

    }

getProductFromFavourite(){
   this.http.get(this.url2).subscribe(res=>{
    this.favouriteProductes.next(res);

   });
}
getfavouriteProductes(){
  this.getProductFromFavourite();
  return this.favouriteProductes;
}
getfavouriteProductesCounter(){
   this.getfavouriteProductes();
   return  this.favouriteProductesCounter;
}

DeleteItemFromFavourite(id:number){
  this.http.delete(this.url2+"/"+id).subscribe(res=>{
    console.log(res);
  })
}


getProductById(prodId:any){
   return this.http.get<any>(this.url+"/"+prodId).pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));
  
}
  
saveproduct(product:Favourite){
  var headers= new HttpHeaders().set("Content-Type", "procademy");

  this.favouriteProductesCounter.next(this.favouriteProductesCounter.value+1)
   console.log(this.favouriteProductesCounter);  
      return this.http.post(this.url2,product).pipe(catchError ((err)=>{
      return throwError (()=>console.log(err))}))
 
  
}
}