import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OrdersComponent } from 'src/app/dashboard/pages/orders/orders.component';
import { CommentsService } from 'src/app/services/comments.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {
  customerId:any;
  productID:any;
  currentcomment:any;
  customerOrders:any;
  constructor(private orderService:OrdersService,private userAuth:UserAuthService,
    private router:Router,private commentService:CommentsService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.userAuth.getUserId().subscribe(id=>{
      this.customerId=id;
    });
    this.orderService.getOrdersForSpecificCustomer(this.customerId).subscribe(res=>{
      this.customerOrders=res;
    })
   
  
  }

  //Got to Add Review for Agiven product 
  addReview(productID:number){
      this.router.navigate(["profile/review-order-purchase/product/",productID]);
    
  }

}
