import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean;
  constructor(private userauth:UserAuthService,private router:Router) { 
    this.isLoggedIn=true;
  }
    
  ngOnInit(): void {
    this.userauth.getLoggedStatus().subscribe(status=>{
      this.isLoggedIn=status;
    })
  }
  search(keyword:any){
     this.router.navigate(['/search/'+keyword.value]);
  }

}
