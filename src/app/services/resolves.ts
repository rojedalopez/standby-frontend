import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { grupoclave } from '../configuration';
import { ClaveValorService, MasterCacheService } from './';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class ClaveValorDominiosResolve implements Resolve<any> {

    constructor(private service: ClaveValorService, private master: MasterCacheService){}

    resolve(): Observable<any> {
        if(this.master.validarKeyLocalStorage(grupoclave.subdominios)){
            this.master.setListSubdominios(this.master.getCacheListas(grupoclave.subdominios));
            return of(this.master.getListSubdominios());
        }else
            return this.master.giveCacheClaveValor(grupoclave.subdominios, (r) => this.master.setListSubdominios(r));
        
    }
}

@Injectable()
export class ClaveValorTipoComponenteResolve implements Resolve<any> {

    constructor(private master: MasterCacheService){}

    resolve(): Observable<any> {
        if(this.master.validarKeyLocalStorage(grupoclave.tipocomponente)){
            this.master.setListTipoComponente(this.master.getCacheListas(grupoclave.tipocomponente));
            return of(this.master.getListTipoComponente());
        }else
            return this.master.giveCacheClaveValor(grupoclave.tipocomponente, (r) => this.master.setListTipoComponente(r));
        
    }
}