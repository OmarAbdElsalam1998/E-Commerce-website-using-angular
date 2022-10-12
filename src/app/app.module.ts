import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { PaymentComponent } from './payment/payment.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { loaderInterceptor } from './spinner/loader-interceptor';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavouriteComponent } from './favourite/favourite.component';
import { SortPipe } from './pipes/sort.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    ProductDetailsComponent,
    ProductsComponent,
    PaymentComponent,
    NotFoundPageComponent,
   ForbiddenComponent,
   SpinnerComponent,
   SearchComponent,
   FavouriteComponent,
   SortPipe

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [Title,{provide:HTTP_INTERCEPTORS,useClass:loaderInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
