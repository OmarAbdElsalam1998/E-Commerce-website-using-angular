 import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { ProductsApiService } from '../services/products-api.service';

@Injectable()
export class loaderInterceptor implements HttpInterceptor {
    constructor(private Service:UserAuthService,private productService:ProductsApiService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
           tap(event=>{
               this.Service.loader.next(true);
               this.productService.prloader.next(true);
               if(event.type==HttpEventType.Response){
                    if(event.status==200){
                       this.Service.loader.next(false);
                        this.productService.prloader.next(false);

                       
                    }
               }
           })
           

            
        )
    }
} 