import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './pages/orders/orders.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductslistComponent } from './pages/productslist/productslist.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { EditproductsComponent } from './pages/editproducts/editproducts.component';
import { UsersComponent } from './pages/users/users.component';
import { SortPipe2 } from './pipes/sort.pipe';


@NgModule({
  declarations: [
    AddProductsComponent,
    MainComponent,
    OrdersComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardMainComponent,
    OrderdetailsComponent,
    ProductslistComponent,
    CategoriesComponent,
    BrandsComponent,
    EditproductsComponent,
    UsersComponent,
    SortPipe2
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    CarouselModule
  
    

  ],
  bootstrap: [MainComponent]
})
export class DashboardModule { }
