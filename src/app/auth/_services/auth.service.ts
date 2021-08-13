import { CurrentUser } from './../_models/auth.model';
import { SocialAuthService } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

import { AuthUser } from '../_models/auth.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private currentUser = new BehaviorSubject<CurrentUser | null>(null);
  currentUser$ = this.currentUser.asObservable();
  public usernameExists$ = new BehaviorSubject<boolean | null>(null);
  private isSocial: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private socialAuthService: SocialAuthService,
  ) {}

  get getToken() {
    return this.token;
  }

  autoAuthUser() {
    const token = this.cookieService.get('token');
    const userId = this.cookieService.get('userId');

    if (!token || !userId) return;
    this.token = token;
    this.httpClient
      .post<{ user: CurrentUser | null }>(
        `${environment.baseApiUrl}/auth/current-user`,
        {
          userId,
        },
      )
      .subscribe((response) => {
        console.log(response);

        if (response.user) {
          this.currentUser.next(response.user);
        }
      });
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

  setAuth(response: AuthUser): void {
    const { user, expiresIn } = response;
    if (user.token) {
      this.token = user.token;
      this.setCookie(user.token, user.id, expiresIn);
      this.currentUser.next(user);
    }
  }

  logoutUser() {
    this.clearCookie();
    this.currentUser.next(null);
    if (this.isSocial) {
      this.socialAuthService.signOut();
      this.isSocial = false;
    }
    this.router.navigate(['/']);
  }

  private setCookie(token: string, userId: string, expiresIn: number) {
    this.cookieService.set('token', token, { expires: expiresIn });
    this.cookieService.set('userId', userId, { expires: expiresIn });
  }

  private clearCookie() {
    this.cookieService.delete('token');
    this.cookieService.delete('userId');
  }

  checkUsernameExists(username: string): void {
    this.httpClient
      .post<{ usernameExists: boolean }>(
        `${environment.baseApiUrl}/auth/username-exsists`,
        {
          username,
        },
      )
      .subscribe({
        next: (response) => {
          if (response.usernameExists) {
            this.usernameExists$.next(true);
          } else {
            this.usernameExists$.next(false);
          }
        },
      });
  }
}
