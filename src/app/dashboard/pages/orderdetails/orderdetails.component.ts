import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {
  orderDetails:any;
  orderId:any;
  constructor(private activatedRoute:ActivatedRoute,private orderService:OrdersService,private titleService:Title) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params=>{
       this.orderId=params.get("id");
       this.getOrderByID(this.orderId);
    });
    this.titleService.setTitle("Order | #"+this.orderId);

  }

  getOrderByID(id:any){
    this.orderService.getOrdersById(id).subscribe(res=>{
      this.orderDetails=res;
      console.log(res);
    })
  }
  changeStatus(status:string){

  }
  printBill(){
    window.print();
  }
}
