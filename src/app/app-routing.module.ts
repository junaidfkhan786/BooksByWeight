import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsdetailComponent } from './productsdetail/productsdetail.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminLoginComponent } from './admin-panel/admin-login/admin-login.component';
import { SearchComponent } from './search/search.component';
import { NewbooksComponent } from './newbooks/newbooks.component';
import { PrebooksComponent } from './prebooks/prebooks.component';
import { AuthGuard } from './auth.guard';
import { AdminauthGuard } from './adminauth.guard'
import { SuperadminGuard } from './superadmin.guard'
import { from } from 'rxjs';
import { AboutusComponent } from './policies/aboutus/aboutus.component';
import { OrderdetailsComponent } from './profile/userorders/orderdetails/orderdetails.component';
import { ErrorComponent } from './error/error.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
  {
    path: '',
    component: HomeComponent
  },

  {
    path: '404',
    component: ErrorComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot',
    component: ForgotpassComponent
  },
  {
    path: 'books',
    component: ProductsComponent
  },
  {
    path: 'books/sortBy100/200',
    component: ProductsComponent
  },
  {
    path: 'books/sortBy200/300',
    component: ProductsComponent
  },
  {
    path: 'books/sortBy400/500',
    component: ProductsComponent
  },
  {
    path: 'books/sortBy300/400',
    component: ProductsComponent
  },
  {
    path: 'books/sortBy500',
    component: ProductsComponent
  },
  {
    path: 'details/:_id',
    component: ProductsdetailComponent
  },
  {
    path: 'books/sortByasc',
    component: ProductsComponent
  },
  {
    path: 'books/sortBydesc',
    component: ProductsComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books/:_id',
    component: ProductsComponent
  },
  {
    path: 'wish',
    component: WishlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminLoginComponent
  },
  {
    path: 'admin/dashboard',
    component: AdminPanelComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/view-products',
    component: AdminPanelComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/view-users',
    component: AdminPanelComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/add-bulk-products',
    component: AdminPanelComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/view-orders',
    component: AdminPanelComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/View-Cat-&&-SubCat',
    component: AdminPanelComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/Coupon',
    component: AdminPanelComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/Admin',
    component: AdminPanelComponent,
    canActivate: [SuperadminGuard]
  },

  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/edit-add',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newbooks',
    component: NewbooksComponent
  },
  {
    path: 'newbooks/sortBy100/200',
    component: NewbooksComponent
  },
  {
    path: 'newbooks/sortBy200/300',
    component: NewbooksComponent
  },
  {
    path: 'newbooks/sortBy400/500',
    component: NewbooksComponent
  },
  {
    path: 'newbooks/sortBy300/400',
    component: NewbooksComponent
  },
  {
    path: 'newbooks/sortBy500',
    component: NewbooksComponent
  },
  {
    path: 'newbooks/sortByasc',
    component: NewbooksComponent
  },
  {
    path: 'newbooks/sortBydesc',
    component: NewbooksComponent
  },
  {
    path: 'prebooks',
    component: PrebooksComponent
  },
  {
    path: 'prebooks/sortBy100/200',
    component: PrebooksComponent
  },
  {
    path: 'prebooks/sortBy200/300',
    component: PrebooksComponent
  },
  {
    path: 'prebooks/sortBy400/500',
    component: PrebooksComponent
  },
  {
    path: 'prebooks/sortBy300/400',
    component: PrebooksComponent
  },
  {
    path: 'prebooks/sortBy500',
    component: PrebooksComponent
  },
  {
    path: 'prebooks/sortByasc',
    component: PrebooksComponent
  },
  {
    path: 'prebooks/sortBydesc',
    component: PrebooksComponent
  },

  {
    path: 'orderdetails/:_id',
    component: OrderdetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/404'
  }



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
