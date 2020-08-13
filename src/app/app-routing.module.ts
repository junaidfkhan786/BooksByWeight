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
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
    path : 'details/:_id',
    component : ProductsdetailComponent
  },
  {
    path : 'books/sortByasc',
    component : ProductsComponent
  },
  {
    path : 'books/sortBydesc',
    component : ProductsComponent
  },
  {
    path : 'cart',
    component : CartComponent
  },
  {
    path : 'books/:_id',
    component : ProductsComponent
  },
  {
    path : 'wish',
    component : WishlistComponent
  },
  {
    path : 'checkout',
    component : CheckoutComponent
  },
  {
    path : 'admin',
    component : AdminLoginComponent
  },
  {
    path : 'admin/dashboard',
    component : AdminPanelComponent
  },
  {
    path : 'admin/dashboard/view-products',
    component : AdminPanelComponent
  },
  {
    path : 'admin/dashboard/view-users',
    component : AdminPanelComponent
  },
  {
    path : 'search',
    component : SearchComponent
  },
  {
    path : 'profile',
    component : ProfileComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
