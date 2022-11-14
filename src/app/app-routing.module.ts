import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminGuard } from './Guards/admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PaymentComponent } from './payment/payment.component';
import { CommentsComponent } from './product-details/components/comments/comments.component';
import { OverviewComponent } from './product-details/components/overview/overview.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"cart",component:CartComponent},
  {path:"products",component:ProductsComponent},
  {path:"category/:category",component:ProductsComponent},

  {path:"product/:id",component:ProductDetailsComponent,children:[
    {path:"",component:OverviewComponent},
    {path:"comments",component:CommentsComponent},
  ]},
  

  {path:"cart/payment",component:PaymentComponent,canActivate:[AuthGuard]},
  {path:"auth",loadChildren:()=>import("../app/auth/auth.module").then(m=>m.AuthModule)},
  {path:"dashboard",loadChildren:()=>import("../app/dashboard/dashboard.module").then(m=>m.DashboardModule),canLoad:[AdminGuard]},
  {path:"profile",loadChildren:()=>import("../app/customer-profile/customer-profile.module").then(m=>m.CustomerProfileModule),canActivate:[AuthGuard]},
  {path:"search/:keyword",component:SearchComponent},
  {path:"favourite",component:FavouriteComponent},
  {path:"error",component:ForbiddenComponent},
  // {path:"users",component:UsersComponent},
  {path:"**",component:NotFoundPageComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
