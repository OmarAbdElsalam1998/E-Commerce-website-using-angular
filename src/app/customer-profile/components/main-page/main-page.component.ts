import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdminRoleService } from 'src/app/services/admin-role.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  customerID:any;
  currentUser:any;
  constructor(public router:Router,private titleService:Title,private userAuth:UserAuthService ,private adminRole:AdminRoleService) { }

  ngOnInit(): void {
    

  //get userID
  this.userAuth.getUserId().subscribe(data =>{
    this.customerID=data;
    console.log(" Get ID profile ",this.customerID)

    //get OldUserData by ID
    this.adminRole.getUserById(this.customerID).subscribe(
      data =>{
        this.currentUser=data;
        console.log(this.currentUser)
        this.titleService.setTitle("Profile | "+this.currentUser.userName+" "+this.currentUser.lastName);

      }
    )
  })    
}
}
