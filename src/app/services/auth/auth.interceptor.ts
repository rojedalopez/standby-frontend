import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../localstorage/local-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TOKEN_NAME } from 'src/app/configuration';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService, private router: Router){}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.get(TOKEN_NAME);

    if (!token) {
      this.router.navigateByUrl('/login');
      return next.handle(req);
    }

    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(headers).pipe(
      (res) => {return res;},
      catchError((err: HttpErrorResponse) => {
        
        if (err.status === 401 || err.status === 403) {
          this.router.navigateByUrl('/login');
        }
        return throwError( err );

      })
    );
  }
}