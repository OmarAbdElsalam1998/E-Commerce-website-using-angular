import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerProfileRoutingModule } from './customer-profile-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';


@NgModule({
  declarations: [
    MainPageComponent,
    GeneralInformationComponent
  ],
  imports: [
    CommonModule,
    CustomerProfileRoutingModule
  ]
})
export class CustomerProfileModule { }
