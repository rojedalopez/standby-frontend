import { Injectable } from '@angular/core';  
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';  
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })  
export class AuthInGuard implements CanActivate {  
    constructor(  
        private router: Router,
        private authService: AuthService
    ) {}  
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
          
        let auth_user = this.authService.isAutenticate();
        if (auth_user.auth) {  
            this.router.navigate(['/']);  
        }else{
            this.authService.removeSession();
        }  
   
        return true;  
    }  
} 