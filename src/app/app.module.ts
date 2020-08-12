
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { ForgotpassService } from './services/forgotpass.service';
import { CategoryService } from './services/category.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { LatestcollectionComponent } from './latestcollection/latestcollection.component';
import { PopularcollectionComponent } from './popularcollection/popularcollection.component';
import { QrComponent } from './qr/qr.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ProductsdetailComponent } from './productsdetail/productsdetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {NgxPaginationModule} from 'ngx-pagination';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';

import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { CartItemsComponent } from './cart/cart-items/cart-items.component';
import { DetailsComponent } from './productsdetail/details/details.component';
import { LatestitemComponent } from './latestcollection/latestitem/latestitem.component';
import { PopularitemComponent } from './popularcollection/popularitem/popularitem.component';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminHeaderComponent } from './admin-panel/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-panel/admin-sidebar/admin-sidebar.component';
import { AdminMainContentComponent } from './admin-panel/admin-main-content/admin-main-content.component';
import { AdminLoginComponent } from './admin-panel/admin-login/admin-login.component';
import { ViewProductsComponent } from './admin-panel/admin-main-content/view-products/view-products.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewUsersComponent } from './admin-panel/admin-main-content/view-users/view-users.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SearchitemComponent } from './search/searchitem/searchitem.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    ProductsComponent,
    LatestcollectionComponent,
    PopularcollectionComponent,
    QrComponent,
    CarouselComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpassComponent,
    ProductsdetailComponent,
    CartComponent,
    WishlistComponent,
    CheckoutComponent,
    ProductItemComponent,
    CartItemsComponent,
    DetailsComponent,
    LatestitemComponent,
    PopularitemComponent,
    AdminPanelComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminMainContentComponent,
    AdminLoginComponent,
    ViewProductsComponent,
    ViewUsersComponent,
    ProfileComponent,
    SearchComponent,
    SearchitemComponent,

    
  


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SocialLoginModule,
    CarouselModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
     
    }),
    NgxSpinnerModule,
    


  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '630153345580-29pt86oukbipoj7sj3ofrhrdl5895rvq.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1217823168556176'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    CategoryService, ForgotpassService,RegisterService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
