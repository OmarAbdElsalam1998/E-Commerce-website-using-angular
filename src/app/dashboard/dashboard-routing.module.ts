import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../Guards/admin.guard';
import { MainComponent } from './main/main.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { EditproductsComponent } from './pages/editproducts/editproducts.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductslistComponent } from './pages/productslist/productslist.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  {path:"",component:MainComponent,canLoad:[AdminGuard],children:[
    {path:"",component:DashboardMainComponent,canLoad:[AdminGuard]},
    {path:"orders/order/:id",component:OrderdetailsComponent,canLoad:[AdminGuard]},
    {path:"productslist",component:ProductslistComponent,canLoad:[AdminGuard]},
    {path:"productslist/addProduct",component:AddProductsComponent,canLoad:[AdminGuard]},
    {path:"productslist/editProduct/:id",component:EditproductsComponent,canLoad:[AdminGuard]},
    {path:"categories",component:CategoriesComponent,canLoad:[AdminGuard]},
    {path:"",component:CategoriesComponent,canLoad:[AdminGuard]},
    {path:"brands",component:BrandsComponent,canLoad:[AdminGuard]},
    {path:"users",component:UsersComponent,canLoad:[AdminGuard]},
    {path:"orders",component:OrdersComponent,canLoad:[AdminGuard]},

  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
