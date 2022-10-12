import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminGuard } from './Guards/admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"cart",component:CartComponent},
  {path:"products",component:ProductsComponent},
  {path:"category/:category",component:ProductsComponent},

  {path:"products/:id",component:ProductDetailsComponent},
  {path:"cart/payment",component:PaymentComponent,canActivate:[AuthGuard]},
  {path:"auth",loadChildren:()=>import("../app/auth/auth.module").then(m=>m.AuthModule)},
  {path:"dashboard",loadChildren:()=>import("../app/dashboard/dashboard.module").then(m=>m.DashboardModule),canLoad:[AdminGuard]},
  {path:"search/:keyword",component:SearchComponent},
  {path:"favourite",component:FavouriteComponent},
  {path:"error",component:ForbiddenComponent},
  {path:"**",component:NotFoundPageComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
