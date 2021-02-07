import { Injectable } from '@angular/core';  
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';  
import { Observable, of, throwError } from 'rxjs';  
import { catchError, delay, mergeMap, retryWhen, take } from 'rxjs/operators';  
import { Router } from '@angular/router';  
  
@Injectable()  
export class ErrorInterceptor implements HttpInterceptor {  
    constructor(private router: Router) { }  
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
          console.log("entro a interceptor")
        return next.handle(request).pipe(retryWhen(this.getRetryInvoque()))  
    }  

    getRetryInvoque(): (errors: Observable<any>) => Observable<any> {
        return error => {
          return error.pipe(
            mergeMap((_error: any) => {
              if (_error.status === 500 || _error.status === 504) {
                return of({error: error}).pipe(delay(1000));
              }else if(_error.status === 401 || _error.status === 403){
                location.href = '/login';
              }
              
              return throwError({error:error, status:_error.status});
            }),
            take(3));
        };
    }

    /*if (err.status === 401 || err.status === 403) {  3
                location.href = '/';
            }else if(err.status === 500){
                return of({error: err}).pipe(delay(1000));
            }
  
            const error = err.error.message || err.statusText;  
            return throwError(error);  */
}