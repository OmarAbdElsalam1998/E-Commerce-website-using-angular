import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../Guards/admin.guard';
import { AddProductsComponent } from './add-products/add-products.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:"",component:MainComponent,canLoad:[AdminGuard]},
  {path:"addProduct",component:AddProductsComponent,canLoad:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
