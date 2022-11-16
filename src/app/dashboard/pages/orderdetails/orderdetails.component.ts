import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { order } from 'src/app/shares classes/order';
import Swal from 'sweetalert2';

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
       this.titleService.setTitle("Order | #"+this.orderId);

    });

  }

  getOrderByID(id:any){
    this.orderService.getOrdersById(id).subscribe(res=>{
      this.orderDetails=res;
      console.log(res);
    })
  }
      //change the Status of Order

  changeStatus(status:string){

          this.orderService.getOrdersById(this.orderId).subscribe(res=>{
            let or=new order(
              res.userId,
              res.firstname,
              res.lastname,
              res.email,
              res .Phone,
              res .country,
              res .region,
              res .city,
              res .zipcode,
              res .street,
              res .subscribewhenreciving,
              res .subscribe,
              res .paymentMethod,
              status,
              res .itemsList,
              res.createdAt,
              res .subTotalPrice,
              res .shippingCharge,
              res .totalPrice,
            );
            this.orderService.updateStatus(or,this.orderId).subscribe(res=>{
              this.getOrderByID(this.orderId);
              
            })
          });
          
          Swal.fire({
            
            title:  'Updated Successfully',
            icon:'success' ,
            showConfirmButton:false,
            timer:1000
            
           })
      }
  printBill(){
    window.print();
  }
}
