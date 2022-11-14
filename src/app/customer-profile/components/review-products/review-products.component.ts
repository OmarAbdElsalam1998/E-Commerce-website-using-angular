import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-review-products',
  templateUrl: './review-products.component.html',
  styleUrls: ['./review-products.component.scss']
})
export class ReviewProductsComponent implements OnInit {
  customerID:any;

  constructor(private userAuth:UserAuthService) { }

  ngOnInit(): void {

    this.userAuth.getUserId().subscribe(res=>{
      this.customerID=res;
    })
  }

}
