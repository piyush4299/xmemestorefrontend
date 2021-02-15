import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // If client side error occured then handle it as below.
          console.error('An error occurred:', error.error.message);
        } else {
          // If backend returned an unsuccessful response code.
          console.error(
            `Issue at Backend side. Code => ${error.status}, body was: ${error.error}`
          );
        }
        return throwError('Please Try Again Later');
      })
    );
  }
}
