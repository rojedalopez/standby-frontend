import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { decode } from 'punycode';
import { TOKEN_NAME } from 'src/app/configuration';
import { LocalStorageService } from '../localstorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService) { }

  auth_usr = {bienvenido: false, actualizar: false, auth: false, usuario: '', nivel: -1, subdominio: {}};

  isAutenticate(){
    const currentUser = this.localStorageService.get(TOKEN_NAME);  
    try{
      if(currentUser === null)
        return this.auth_usr;

      const decoded:any = jwt_decode(currentUser);

      if(new Date(decoded.exp * 1000).valueOf() < new Date().valueOf())
        return this.auth_usr;

      return {bienvenido: decoded.bienvenido, actualizar: decoded.actualizar, 
              auth: true, usuario: decoded.sub, nivel: decoded.nivel,
              subdominio: decoded.subdominio};
    }catch(err){
      return this.auth_usr;
    }
  }

  removeSession(){
    this.localStorageService.remove(TOKEN_NAME);
  }  
}
