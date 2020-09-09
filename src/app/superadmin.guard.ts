import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class SuperadminGuard implements CanActivate{
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
      if ( localStorage.getItem('SuperAdmin') ){

        // Token from the LogIn is avaiable, so the user can pass to the route
        return true
      }
       else if(localStorage.getItem('Admin'))  {
          return true
        }else{
              // Token from the LogIn is not avaible because something went wrong or the user wants to go over the url to the site
        // Hands the user to the LogIn page 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You are currently not logged in, please provide Login!',
        })
     
        this.router.navigate( ["/admin"] );
        return false
  
      }
  }
}
