import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('id_token');
          this.router.navigateByUrl('/');
        }
        let errorMsg = '';
        let toasterMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
          toasterMessage = error.error.message;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          toasterMessage = error.message;
        }
        this.toastr.error(toasterMessage);
        return throwError(errorMsg);
      })
    );
  }
}
