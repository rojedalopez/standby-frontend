import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint_login } from 'src/app/configuration';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  create(user): Observable<any>{
    return this.http.post(endpoint_login, user).pipe();
  }

}
