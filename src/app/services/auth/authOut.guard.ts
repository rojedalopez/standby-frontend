import { Injectable } from '@angular/core';  
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';  
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })  
export class AuthOutGuard implements CanActivate {  
    constructor(  
        private router: Router,
        private authService: AuthService
    ) {}  
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
          
        let auth_user = this.authService.isAutenticate();
        if (auth_user.auth) {  
            console.log(state.url);
            if(state.url.match(/usuario\/[a-z]+#/) == null){
                if(auth_user.bienvenido){
                    this.router.navigate([`/usuario/${auth_user.usuario}`], {fragment: "bienvenido"});
                }else{ 
                    if(auth_user.actualizar)
                        this.router.navigate([`/usuario/${auth_user.usuario}`], {fragment: "actualiza"});
                }
            }
        }else{
            this.router.navigate([`/login`]);
        }  
   
        return true;  
    }  
} 