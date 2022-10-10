import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:any;
  username:any;
  constructor(private userauth:UserAuthService,private router:Router,private userAuth:UserAuthService) { 
    this.isLoggedIn=this.userAuth.getLoggedStatus();
    console.log(this.username)
   
  }
    
  ngOnInit(): void {
    this.userauth.getLoggedStatus().subscribe(status=>{
      this.isLoggedIn=status;
    })
    this.userauth.getUsername().subscribe(status=>{
      this.username=status;
    })
   
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  logOut(){
    this.userauth.logOut();
    this.router.navigate([""]);

  }
  search(keyword:any){
     this.router.navigate(['/search/'+keyword.value]);
  }

}
