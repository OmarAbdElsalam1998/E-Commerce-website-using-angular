 import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class loaderInterceptor implements HttpInterceptor {
    constructor(private Service:UserAuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
           tap(event=>{
               this.Service.loader.next(true);
               if(event.type==HttpEventType.Response){
                    if(event.status==200){
                        this.Service.loader.next(false);
                    }
               }
           })

            
        )
    }
} 