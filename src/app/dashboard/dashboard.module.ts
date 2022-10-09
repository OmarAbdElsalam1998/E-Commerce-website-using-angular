import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddProductsComponent } from './add-products/add-products.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AddProductsComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  bootstrap: [MainComponent]
})
export class DashboardModule { }
