import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:"",component:MainComponent},
  {path:"addProduct",component:AddProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
