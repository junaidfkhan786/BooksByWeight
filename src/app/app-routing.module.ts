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
import { ViewProductsComponent } from './admin-panel/admin-main-content/view-products/view-products.component';
import { ViewUsersComponent } from './admin-panel/admin-main-content/view-users/view-users.component';
import { ViewOrdersComponent } from './admin-panel/admin-main-content/view-orders/view-orders.component';
import { BooksearchComponent } from './admin-panel/admin-main-content/booksearch/booksearch.component';
import { AddbookComponent } from './admin-panel/admin-main-content/addbook/addbook.component';
import { EditbookComponent } from './admin-panel/admin-main-content/editbook/editbook.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { AdminOrderDetailComponent } from './admin-panel/admin-main-content/view-orders/admin-order-detail/admin-order-detail.component';
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
    path: 'books/sortBy0/100',
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
    path: 'categories/:_id',
    component: CategoriesComponent
  },
  {
    path: 'categories/sortBy0/100',
    component: CategoriesComponent
  },
  {
    path: 'categories/sortBy100/200',
    component: CategoriesComponent
  },
  {
    path: 'categories/sortBy200/300',
    component: CategoriesComponent
  },
  {
    path: 'categories/sortBy400/500',
    component: CategoriesComponent
  },
  {
    path: 'categories/sortBy300/400',
    component: CategoriesComponent
  },
  {
    path: 'categories/sortBy500',
    component: CategoriesComponent
  },

  {
    path: 'subcategory/:_id',
    component: SubcategoriesComponent
  },
  {
    path: 'subcategory/sortBy0/100',
    component: SubcategoriesComponent
  },
  {
    path: 'subcategory/sortBy100/200',
    component: SubcategoriesComponent
  },
  {
    path: 'subcategory/sortBy200/300',
    component: SubcategoriesComponent
  },
  {
    path: 'subcategory/sortBy400/500',
    component: SubcategoriesComponent
  },
  {
    path: 'subcategory/sortBy300/400',
    component: SubcategoriesComponent
  },
  {
    path: 'subcategory/sortBy500',
    component: SubcategoriesComponent
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
    component: ViewProductsComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/view-users',
    component: ViewUsersComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/add-bulk-products',
    component: AdminPanelComponent,
    canActivate: [SuperadminGuard]
  },
  {
    path: 'admin/dashboard/view-orders',
    component: ViewOrdersComponent,
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
    path: 'search/:_id',
    component: SearchComponent
  },
  {
    path: 'admin/dashboard/booksearch/:_id',
    component: BooksearchComponent,
    canActivate:[SuperadminGuard]
  },
  {
    path: 'admin/dashboard/addbook',
    component: AddbookComponent,
    canActivate:[SuperadminGuard]
  },
  {
    path: 'admin/dashboard/editbook/:_id',
    component: EditbookComponent,
    canActivate:[SuperadminGuard]
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
    path: 'newbooks/sortBy0/100',
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
    path: 'prebooks/sortBy0/100',
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
    path: 'admin/dashboard/view-orders/AdminOrderDetails/:_id',
    component: AdminOrderDetailComponent,
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
