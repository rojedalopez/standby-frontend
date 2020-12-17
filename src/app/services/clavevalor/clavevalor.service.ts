import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClaveValor } from 'src/app/models/clavevalor';
import { endpoint_clavevalor, endpoint_grupoclave } from '../../configuration';
import { retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClaveValorService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(endpoint_clavevalor).pipe();
  }

  getByGrupoValor(grupoclave:String){
    return this.http.get(`${endpoint_grupoclave}/${grupoclave}/clavevalor`);
  }

  create(clavevalor:ClaveValor){
    return this.http.post(endpoint_clavevalor, clavevalor).pipe();
  }

  update(clavevalor:ClaveValor){
    return this.http.put(endpoint_clavevalor, clavevalor).pipe();
  }
}
