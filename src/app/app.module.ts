
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
import { UserordersComponent } from './profile/userorders/userorders.component';
import { UseraddressComponent } from './profile/useraddress/useraddress.component';
import { UserAccountEditComponent } from './profile/user-account-edit/user-account-edit.component';
import { AdminFilterPipe } from './pipes/admin-filter.pipe';
import { AdminUserPipe } from './pipes/admin-user.pipe';
import { NewbooksComponent } from './newbooks/newbooks.component';
import { NewbooksitemComponent } from './newbooks/newbooksitem/newbooksitem.component';
import { PrebooksComponent } from './prebooks/prebooks.component';
import { PrebookitemsComponent } from './prebooks/prebookitems/prebookitems.component';
import {AuthGuard} from 'src/app/auth.guard'
import { ViewOrdersComponent } from './admin-panel/admin-main-content/view-orders/view-orders.component';
import { AddCatSubcatComponent } from './admin-panel/admin-main-content/add-cat-subcat/add-cat-subcat.component';
import { AdminCategoryPipe } from './pipes/admin-category.pipe';
import { CouponComponent } from './admin-panel/admin-main-content/coupon/coupon.component';
import { AboutusComponent } from './policies/aboutus/aboutus.component';
import { CopyrightpolicyComponent } from './policies/copyrightpolicy/copyrightpolicy.component';
import { PaymentComponent } from './policies/payment/payment.component';
import { PrivacyComponent } from './policies/privacy/privacy.component';
import { ReturnsRefundPolicyComponent } from './policies/returns-refund-policy/returns-refund-policy.component';
import { ShippingComponent } from './policies/shipping/shipping.component';
import { TermsConditionsComponent } from './policies/terms-conditions/terms-conditions.component';
import { AdminCreateComponent } from './admin-panel/admin-main-content/admin-create/admin-create.component';
import {NumberDirective} from './directives/numbersonly.directive';
import { OrderdetailsComponent } from './profile/userorders/orderdetails/orderdetails.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ErrorComponent } from './error/error.component';
import { CountcardsComponent } from './admin-panel/admin-main-content/countcards/countcards.component'

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
    UserordersComponent,
    UseraddressComponent,
    UserAccountEditComponent,
    AdminFilterPipe,
    AdminUserPipe,
    NewbooksComponent,
    NewbooksitemComponent,
    PrebooksComponent,
    PrebookitemsComponent,
    ViewOrdersComponent,
    AddCatSubcatComponent,
    AdminCategoryPipe,
    CouponComponent,
    AboutusComponent,
    CopyrightpolicyComponent,
    PaymentComponent,
    PrivacyComponent,
    ReturnsRefundPolicyComponent,
    ShippingComponent,
    TermsConditionsComponent,
    AdminCreateComponent,
    NumberDirective,
    OrderdetailsComponent,
    TruncatePipe,
    ErrorComponent,
    CountcardsComponent





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
              '630153345580-ckpja6ssble3114oipg3gk4oloeaih8e.apps.googleusercontent.com'
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
    CategoryService, ForgotpassService,RegisterService,LoginService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
