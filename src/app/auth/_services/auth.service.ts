import { SocialAuthService } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

import { AuthUser } from '../_models/auth.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null;
  private isAuthenticated = false;
  private authStatusListener$ = new Subject<{ isAuth: boolean }>();
  private userId: string | null;
  private isSocial: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private socialAuthService: SocialAuthService,
  ) {
    this.token = null;
    this.userId = '';
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener$.asObservable();
  }

  getToken() {
    return this.token;
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) return;

    this.isAuthenticated = true;
    this.userId = authInfo.userId;
    this.token = authInfo.token;
    this.authStatusListener$.next({ isAuth: true });
  }

  loginUser(username: string, password: string) {
    const user = { username, password };
    return this.httpClient
      .post<AuthUser>(`${environment.baseApiUrl}/auth/login`, { user })
      .pipe(tap((response) => this.setAuth(response)));
  }

  socialLogin(data: {
    email: string;
    authToken: string;
    photoUrl: string;
    provider: string;
  }) {
    this.isSocial = true;
    return this.httpClient
      .post<AuthUser>(`${environment.baseApiUrl}/auth/social-login`, data)
      .pipe(tap((response) => this.setAuth(response)));
  }

  registerUser(username: string, email: string, password: string) {
    const user = { username, password, email };
    return this.httpClient
      .post<AuthUser>(`${environment.baseApiUrl}/auth/register`, { user })
      .pipe(tap((response) => this.setAuth(response)));
  }

  setAuth(response: AuthUser) {
    this.token = response.user.token;
    if (this.token) {
      const expiresIn = response.expiresIn;
      this.isAuthenticated = true;
      this.userId = response.user.id;
      this.authStatusListener$.next({ isAuth: true });
      this.setCookie(this.token, this.userId, expiresIn);
    }
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener$.next({ isAuth: false });
    this.clearCookie();
    if (this.isSocial) {
      this.socialAuthService.signOut();
      this.isSocial = false;
    }
    this.router.navigate(['/']);
  }

  private getAuthData() {
    const token = this.cookieService.get('token');
    const userId = this.cookieService.get('token');

    if (!token || !userId) return;

    return { token, userId };
  }

  private setCookie(token: string, userId: string, expiresIn: number) {
    this.cookieService.set('token', token, { expires: expiresIn });
    this.cookieService.set('id', userId, { expires: expiresIn });
  }

  private clearCookie() {
    this.cookieService.delete('token');
    this.cookieService.delete('id');
  }
}
