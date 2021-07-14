import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { AuthUser } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null;
  private isAuthenticated = false;
  private authStatusListener$ = new Subject<{ isAuth: boolean }>();
  private userId: string | null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService,
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
    this.httpClient
      .post<AuthUser>('http://localhost:5000/api/auth/login', { user })
      .subscribe((response) => {
        this.setAuth(response);
      });
  }

  registerUser(username: string, email: string, password: string) {
    const user = { username, password, email };
    this.httpClient
      .post<AuthUser>('http://localhost:5000/api/auth/register', { user })
      .subscribe((response) => {
        this.setAuth(response);
      });
  }

  setAuth(response: AuthUser) {
    this.token = response.user.token;
    if (this.token) {
      const expiresIn = response.expiresIn;
      this.isAuthenticated = true;
      this.userId = response.user.id;
      this.authStatusListener$.next({ isAuth: true });
      this.setCookie(this.token, this.userId, expiresIn);
      this.router.navigate(['/']);
    }
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener$.next({ isAuth: false });
    this.clearCookie();
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
  }
}
