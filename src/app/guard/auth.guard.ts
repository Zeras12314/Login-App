import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot ) => {
    const service: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const toastr: ToastrService = inject(ToastrService);

    if(service.isLoggedIn()){
      if(route.url.length > 0){
        let menu = route.url[0].path;
        if (menu == 'user'){
          if(service.getUserRole()== 'admin'){
            return true
          } else {
            toastr.warning('You dont have access');
            router.navigate([''])
            return false;
          }
        } else {
          return true
        }
      }
      
      return true;
    } else {
      router.navigate(['login']);
      return false
    }
  
 
};


// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from '../service/auth.service';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private service: AuthService, private router: Router, private toastr: ToastrService) {} 

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     if(this.service.isLoggedIn()){
//       return true;      
//     } else {
//       this.router.navigate(['login']);
//       return false;
//     }
   
//   }
// }
