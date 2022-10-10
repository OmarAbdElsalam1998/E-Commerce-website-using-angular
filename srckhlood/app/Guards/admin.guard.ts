import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  isAdmin:boolean=false;
  constructor(private userServise:UserAuthService,private router:Router){}
  ngOnInit(): void {
     this.userServise.getIsAdminStatus().subscribe(status=>{
      this.isAdmin=status;
     })
    
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isAdmin){
        return true;
    }
    else{
      this.router.navigate(['/error']);
      return false
    }
  }
  
}
