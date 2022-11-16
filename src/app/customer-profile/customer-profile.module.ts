import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerProfileRoutingModule } from './customer-profile-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { ReviewProductsComponent } from './components/review-products/review-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [
    MainPageComponent,
    GeneralInformationComponent,
    OrderTrackingComponent,
    ReviewProductsComponent,
    SettingsComponent,


  ],
  imports: [
    CommonModule,
    CustomerProfileRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CustomerProfileModule { }
