import { Component, OnInit,ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrdersService } from 'src/app/services/orders.service';
import { Icategories } from 'src/app/shares classes/Icategories';
import { order } from 'src/app/shares classes/order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:any=[];
  copyOrders:any=[];
  orderStatus:string="";
  selectedOrder:any=[];
  page:number=1;
  currentDateTime=Date.now();
  waitingForReview:number=0;
  beingProcessed:number=0
  prepared:number=0
  outForDelivery:number=0
  delivered:number=0
  cancelled:number=0
  beingRetrived:number=0
  retrived:number=0
  constructor( private orderService:OrdersService,
    private elementRef:ElementRef,private router:Router,
    private titleService:Title,private fb:FormBuilder) { }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
  }
  changeStatusForm=this.fb.group({
    status:['',Validators.required],

  })

  get status(){
    return this.changeStatusForm.get("status");
  }
  ngOnInit(): void {  
    this.titleService.setTitle("Orders");
   
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.getAllOrders();

  
  }


  getAllOrders(){
    
 
    this.orderService.getOrders().subscribe(res=>{
      this.orders=res;
      this.copyOrders=res;
      this.setNumbeOfEachOrderStatus();
      
    });
  
    //  console.log(d[0])
  }


  //set number of each order status
  setNumbeOfEachOrderStatus(){
    this.waitingForReview=0;
    this.beingProcessed=0
    this.prepared=0
    this.outForDelivery=0
    this.delivered=0
    this.cancelled=0
    this.beingRetrived=0
    this.retrived=0
    this.orderService.getOrders().subscribe(orders=>{
      orders.forEach((order:any)=>{
        switch (order.orderStatus ){
    
          case"WaitingForReview":{ 
            this.waitingForReview+=1;
            break; 
         } 
         case"beingProcessed":{ 
          this.beingProcessed+=1;
          break; 
          } 
          case"prepared":{ 
            this.prepared+=1;
            break; 
          } 
          case"outForDelivery":{ 
            this.outForDelivery+=1;
            break; 
         } 
          case"delivered":{ 
            this.delivered+=1;
            break; 
          } 
          case"cancelled":{ 
            this.cancelled+=1;
            break; 
          } 
    
          case"beingRetrived":{ 
            this.beingRetrived+=1;
            break; 
          } 
          case"retrived":{ 
            this.retrived+=1;
            break; 
          } 
  
        }
      });
    })
    
  }
  //Search for order
  search(e:any){
    this.page=1;
    console.log(e.keyCode);
    this.copyOrders=[...this.orders];
    if(e.target.value==""){
      // this.ngOnInit();
    }
    else{

      this.copyOrders=this.copyOrders.filter((res:any)=>{
        return res.id==e.target.value;
      });
    }
  }

  //Change Status of order to filter data by status ==>used in top filteration 
  changeStatus(status:string){
   
    if(this.orderStatus=="" ||this.orderStatus!=status){
      this.orderStatus=status;
      this.getOrderByStatus("?orderStatus="+this.orderStatus);

    }
    else if(this.orderStatus==status){
      this.orderStatus="";
      this.getAllOrders();

    }

  console.log(this.orderStatus);
    

  }

  //change the Status of Order
  changeOrderStatus(){
    console.log(this.changeStatusForm.value.status)
    this.selectedOrder.forEach((_orderId:any) => {
        this.orderService.getOrdersById(_orderId).subscribe(res=>{
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
            this.changeStatusForm.value.status!,
            res .itemsList,
            res.createdAt,
            res .subTotalPrice,
            res .shippingCharge,
            res .totalPrice,
          );
          this.orderService.updateStatus(or,_orderId).subscribe(res=>{
            if( this.orderStatus==""){
              this.getAllOrders();
              this.setNumbeOfEachOrderStatus();

            }
            else{
              this.getOrderByStatus("?orderStatus="+this.orderStatus);
              this.setNumbeOfEachOrderStatus();

            }
          })
        });
        let close = document.getElementById('close');
        close?.click();
        
        Swal.fire({
          
          title:  'Updated Successfully',
          icon:'success' ,
          showConfirmButton:false,
          timer:1000
          
         })
    },this.selectedOrder=[],this.setNumbeOfEachOrderStatus()
    );
 // var sr=new order("cancelled");
    // var cat =new Icategories ( "dd","this.categoryImageUrl",[])
    // this.orderService.updateStatus(cat,0).subscribe(res=>{
    //   console.log(res);
    // });
  }
  //get order from api by status
  getOrderByStatus(status:string){
    this.orderService.getOrderByStatus(status).subscribe(res=>{
      this.orders=res;
      this.copyOrders=res;
    })
  }


//select order when checkbox is checked
  selectOrder(event:any){
    if(event.target.checked){
      console.log(event.target.value);
      var order=document.getElementById(event.target.value);
      this.selectedOrder.push(event.target.value);
      
      order!.style.backgroundColor="#EEE";
    }
    else{
      console.log(event.target.value);
      this.selectedOrder.splice(parseInt(event.target.value),1);
      var order=document.getElementById(event.target.value);

      
      order!.style.background="none";
    }
  }
  showFormToSelectStatus(){
    if(this.selectedOrder.length==0){
      Swal.fire({
          
        title: 'Attention',
        text: "Select At Least one Order",
        icon:'warning' ,
        showConfirmButton:true,
        
       });
    }
  }
   


  showConfirmAlert(){
    if(this.selectedOrder.length==0){
      Swal.fire({
          
        title: 'Attention',
        text: "Select At Least 1 Order",
        icon:'warning' ,
        showConfirmButton:true,
        
       })
    }
    else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

         this.selectedOrder.forEach((order:any) => {
            this.deleteOrder(order);
          
         });
          swalWithBootstrapButtons.fire({
          
            title:  'Deleted!',
            text: "You won't be able to revert this!",
            icon:'success' ,
            showConfirmButton:false,
            timer:1000
            
           })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
         
        }
      })
    }
   
  }

  deleteOrder(id:number){
    this.orderService.deletOrder(id).subscribe(result=>{
       this.ngOnInit();
    })
  }
  key:string="id";
  reverse:boolean=false;
  sort(key:string){
    this.key=key;
    this.reverse=!this.reverse;


  }

  // //update Order Status
  // updateOrderStatus(status:string){
  //   if(this.selectedOrder.length==0){
  //     Swal.fire({
          
  //       title: 'Attention',
  //       text: "Select At Least 1 Order",
  //       icon:'warning' ,
  //       showConfirmButton:true,
        
  //      })
  //   }
  //   else{
  //     this.selectedOrder.forEach((order:any) => {
        
  //       console.log(order);
  //     });
  //   }
  // } 


  //go to order details page
  
  OrderDetails(id:number){
    this.router.navigate(['dashboard/orders/order/',id]);
  
  }
}
