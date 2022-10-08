import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loader:any;
  constructor( private userService:UserAuthService) { 
    this.userService.loader.subscribe(res=>{
      this.loader=res;
    })
  }

  ngOnInit(): void {
  }

}
