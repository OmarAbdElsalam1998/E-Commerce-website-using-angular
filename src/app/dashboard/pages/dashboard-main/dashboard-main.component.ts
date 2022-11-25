import { Component, OnInit } from '@angular/core';
import { AdminRoleService } from 'src/app/services/admin-role.service';
import { BrandsService } from 'src/app/services/brands.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserRole } from 'src/app/shares classes/userRole';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
 products:any;
 customers:any;
 orders:any;
 brands:any

  constructor(
    private productsService:ProductsService,
    private userService:AdminRoleService,
    private orderService:OrdersService,
    private brandService:BrandsService
    ) { }

  ngOnInit(): void {
    this.userService.getCustomers().subscribe(res=>{
      this.customers=res
    })
    this.productsService.getProduct().subscribe(res=>{
      this.products=res
    })
    this.orderService.getOrders().subscribe(res=>{
      this.orders=res
    })
    this.brandService.getAllbrands().subscribe(res=>{
      this.brands=res
    })
  }

}
