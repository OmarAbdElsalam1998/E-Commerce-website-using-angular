import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedIn:any;
  constructor(private userauth:UserAuthService,private router:Router, private activateRouter:ActivatedRoute){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.userauth.getLoggedStatus().subscribe(status=>{
        this.loggedIn=status;
        console.log(this.loggedIn)
       })
       if(!this.loggedIn){
        return true;
       }
       else{
          alert("you Must Log In");
          this.router.navigate(['/auth/login']);
          return false; 
       }
    }
  
}
