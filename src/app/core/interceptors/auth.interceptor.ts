import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.baseApiUrl;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    let requestUrl = request.url;
    const token = this.userService.getToken;
    const isApiRequest = request.url.startsWith('/api');

    //Non authenticated api requests
    if (isApiRequest && !token) {
      requestUrl = request.url.replace('/api', API_URL);
      return next.handle(
        request.clone({
          url: request.url.replace('/api', API_URL),
        }),
      );
    }
    // Authenticated api requests
    if (token && isApiRequest) {
      const authenticatedRequest = request.clone({
        url: request.url.replace('/api', API_URL),
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authenticatedRequest);
    }

    //all non api requests
    return next.handle(request);
  }
}

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
