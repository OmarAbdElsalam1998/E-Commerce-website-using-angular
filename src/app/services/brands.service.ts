import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { brand } from '../shares classes/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  
  constructor(private http: HttpClient) { }
  baseUrl ="http://localhost:3000";

  Postbrand(data:brand){
    return this.http.post<brand>(this.baseUrl+'/brands', data);
  }

  getAllbrands(){
    return this.http.get<brand>(this.baseUrl+'/brands');
  }
  

  Deletebrand(id:any){
    return this.http.delete<brand>(this.baseUrl+'/brands/'+ id);
  }

  Updatebrand(id:number,data:brand ){
    return this.http.put<brand>(this.baseUrl+'/brands/'+id, data);
  }

  getCurrent(id:any) {
    return this.http.get<brand>(this.baseUrl+'/brands/'+id);
  }
 

}
