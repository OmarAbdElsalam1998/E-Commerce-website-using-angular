import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean;
  constructor(private userauth:UserAuthService) { 
    this.isLoggedIn=true;
  }
    
  ngOnInit(): void {
    this.userauth.getLoggedStatus().subscribe(status=>{
      this.isLoggedIn=status;
    })
  }

}
