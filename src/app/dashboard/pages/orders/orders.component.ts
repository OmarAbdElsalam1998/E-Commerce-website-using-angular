import { Component, OnInit,ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrdersService } from 'src/app/services/orders.service';
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
  page:number=1;
  constructor( private orderService:OrdersService,private elementRef:ElementRef) { }
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
  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
   this.orderService.getOrders().subscribe((response)=>{
    this.orders=response;
    this.copyOrders=response;
   })
  }
  search(e:any){
    console.log(e.keyCode);
    this.copyOrders=[...this.orders];
    if(e.target.value==""){
      // this.ngOnInit();
    }
    else{

      this.copyOrders=this.copyOrders.filter((res:any)=>{
        return res.firstname.toLocaleLowerCase().match(e.target.value.toLocaleLowerCase());
      });
    }
  }
  changeStatus(status:string){
    if(this.orderStatus=="" ||this.orderStatus!=status){
      this.orderStatus=status;
    }
    else if(this.orderStatus==status){
      this.orderStatus="";

    }
  console.log(this.orderStatus);
    

  }
  showConfirmAlert(){
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
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  key:string="id";
  reverse:boolean=false;
  sort(key:string){
    this.key=key;
    this.reverse=!this.reverse;


  }
  
}
