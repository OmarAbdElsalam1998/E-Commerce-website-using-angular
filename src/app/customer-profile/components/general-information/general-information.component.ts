import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {
  customerID:any;
  constructor( private userAuth:UserAuthService) { }

  ngOnInit(): void {
    this.userAuth.getUserId().subscribe(res=>{
      this.customerID=res;
    })
  }

}
