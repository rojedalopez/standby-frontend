import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoint_evento } from '../../configuration';
import { Evento } from '../../models/evento';
import { Observable } from 'rxjs';
import { retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(endpoint_evento).pipe();
  }

  getById(id_evento:Number): Observable<any>{
    return this.http.get(`${endpoint_evento}/${id_evento}`).pipe();
  }

  getByComponente(id_componente:Number): Observable<any>{
    return this.http.get(`${endpoint_evento}/componente/${id_componente}`).pipe();
  }

  create(evento:Evento): Observable<any>{
    return this.http.post(endpoint_evento, evento).pipe();
  }

  update(evento:Evento): Observable<any>{
    return this.http.put(endpoint_evento, evento).pipe();
  }

  upload(file:any[], id): Observable<any>{
    let formdata: FormData = new FormData();
    for(var i = 0; i< file.length; i++){
      formdata.append('files[]', file[i], file[i].name);
    }
    return this.http.post(`${endpoint_evento}/upload/${id}`, formdata).pipe();
  }

  delete(evento:Evento){
    return this.http.delete(`${endpoint_evento}/${evento.id_evento}`).pipe();
  }
}
