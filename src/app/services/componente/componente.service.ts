import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Componente } from 'src/app/models/componente';
import { endpoint_componente } from '../../configuration';
import { retryWhen } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(endpoint_componente).pipe();
  }

  getFindById(id_componente): Observable<any>{
    return this.http.get(`${endpoint_componente}/buscar/${id_componente}`).pipe();
  }

  create(componente:Componente){
    return this.http.post(endpoint_componente, componente).pipe();
  }

  update(componente:Componente){
    return this.http.put(endpoint_componente, componente).pipe();
  }

  delete(componente:Componente){
    return this.http.delete(`${endpoint_componente}/${componente.id_componente}`).pipe();
  }

  getComponent(nombre:string): Observable<any>{
    return this.http.get(`${endpoint_componente}/${nombre}`).pipe();
  }
}
