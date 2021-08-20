import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToasterService } from './../services/toaster.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToasterService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              this.toasterService.error(error.error.message);
              break;
            case 500:
              this.toasterService.error('Something went wrong!');
              break;
          }
        }
        return throwError(error);
      }),
    );
  }
}

export const errorInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
