import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint_usuario } from 'src/app/configuration';
import { Usuario } from 'src/app/models/usuario';
import { retryWhen } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(endpoint_usuario).pipe();
  }

  getById(id_usuario): Observable<any>{
    return this.http.get(`${endpoint_usuario}/${id_usuario}`).pipe();
  }

  create(usuario:Usuario){
    return this.http.post(endpoint_usuario, usuario).pipe();
  }

  multiples(file:File, fk_subdominio:number): Observable<any>{
    let formdata: FormData = new FormData();
    formdata.append('file', file, file.name);
    return this.http.post(`${endpoint_usuario}/multiples/${fk_subdominio}`, formdata).pipe();
  }

  update(usuario:Usuario){
    return this.http.put(endpoint_usuario, usuario).pipe();
  }

  updateInfo(usuario:Usuario): Observable<any>{
    return this.http.put(`${endpoint_usuario}/actualizar`, usuario).pipe();
  }

  delete(usuario:Usuario){
    return this.http.delete(`${endpoint_usuario}/${usuario.id_usuario}`).pipe();
  }
}
