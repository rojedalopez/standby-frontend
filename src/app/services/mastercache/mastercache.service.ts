import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../localstorage/local-storage.service';
import { ClaveValor } from '../../models/clavevalor';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClaveValorService } from '../clavevalor/clavevalor.service';

export class Guardado{
  lista: any[];
  expiracion: number
}

@Injectable({
  providedIn: 'root'
})
export class MasterCacheService {

  private listSubdominios: ClaveValor[];
  private listTipoComponente: ClaveValor[];

  constructor(private storage: LocalStorageService, private service: ClaveValorService) { }

  validarKeyLocalStorage(key: string){
    let ls: Guardado = this.storage.get(key);
    if(ls != null && ls != undefined){
        if(new Date().getTime() <= ls.expiracion)
          return true;
    }
    return false;
  }

  setCacheListas(key: string, _lista:any){
    let _expiracion = new Date().getTime() + ( 6 * 60 * 1000);
    let guardado = {lista: _lista, expiracion: _expiracion};
    this.storage.set(key, guardado);
  }

  getCacheListas(key: string): any[]{
    let ls: Guardado = this.storage.get(key);
    return ls.lista;
  }

  giveCacheClaveValor(key: string, setList: Function) : Observable<any>{
    return this.service.getByGrupoValor(key).pipe(
        tap(res => {
            this.setCacheListas(key, res);
            setList(res);
            return this.getCacheListas(key);
        })
    );
  }

  getListSubdominios() : ClaveValor[]{
      return this.listSubdominios;
  }

  setListSubdominios(list: any) : void{
    this.listSubdominios = list;
  }

  getListTipoComponente() : ClaveValor[]{
    return this.listTipoComponente;
  }

  setListTipoComponente(list: any) : void{
    this.listTipoComponente = list;
  }

}
