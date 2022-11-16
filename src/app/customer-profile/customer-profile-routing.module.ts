import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { ReviewProductsComponent } from './components/review-products/review-products.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {path:"",component:MainPageComponent,children:[
    {path:"",component:GeneralInformationComponent},
    {path:"tracking_Orders",component:OrderTrackingComponent},
    // {path:"general-info",component:GeneralInformationComponent},
    {path:"review-order-purchase/product/:id",component:ReviewProductsComponent},
    {path:"settings",component:SettingsComponent}

  ]},
  {path:"**",component:NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerProfileRoutingModule { }
