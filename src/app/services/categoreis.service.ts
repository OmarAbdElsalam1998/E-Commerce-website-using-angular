import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { Icategories } from '../shares classes/Icategories';

@Injectable({
  providedIn: 'root'
})
export class CategoreisService {
  url:string="http://localhost:3000/categories";
  constructor(private http:HttpClient) { }

  getAllcategroies():Observable<Icategories[]>
{
 return this.http.get<Icategories[]>(this.url).pipe(catchError((err)=>{
        return throwError(()=>err.message || "Internal Server error");  
       }));
}

addcategory(newcat:Icategories)
{
    return this.http.post<Icategories[]>(this.url, newcat).pipe(catchError((err)=>{
      return throwError(()=>err.message || "Internal Server error");  
     }));
}


deletecategory(catid:Number){
  return this.http.delete<Icategories[]>(this.url+"/"+ catid).pipe(catchError((err)=>{
    return throwError(()=>err.message || "Internal Server error");  
   }));
}
getcurrunetcategory(catid:Number){
  return this.http.get<any>(this.url+"/"+ catid).pipe(catchError((err)=>{
    return throwError(()=>err.message || "Internal Server error");  
   }));
}
getCategoryByName(name:Number){
  return this.http.get<any>(this.url+"?Name="+ name).pipe(catchError((err)=>{
    return throwError(()=>err.message || "Internal Server error");  
   }));
}


updatecategroy(catid:number,updatePrd:any)
{
  return this.http.put<any>(this.url+"/"+catid, updatePrd).pipe(catchError((err)=>{
    return throwError(()=>err.message || "Internal Server error");  
   }));
}

}
