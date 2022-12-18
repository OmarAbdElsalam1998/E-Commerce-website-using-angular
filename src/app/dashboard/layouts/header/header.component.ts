import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private userAuth:UserAuthService,private router:Router) { }

  ngOnInit(): void {
 
  
   }
   toggleSidebar(){
    document.body.classList.toggle("toggle-sidebar");
   }
   logOut(){
    this.userAuth.logOut();
    this.router.navigate([""]);

  }
}
