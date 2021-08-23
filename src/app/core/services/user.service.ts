import { ToasterService } from './toaster.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

import { AuthUser, CurrentUser } from '../../shared/interfaces/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
    private toasterService: ToasterService,
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
      .post<{ user: CurrentUser | null }>(`/api/auth/current-user`, {
        userId,
      })
      .subscribe((response) => {
        if (response.user) {
          this.currentUser.next(response.user);
        }
      });
  }

  loginUser(username: string, password: string) {
    const user = { username, password };
    return this.httpClient
      .post<AuthUser>(`/api/auth/login`, { user })
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
      .post<AuthUser>(`/api/auth/social-login`, data)
      .pipe(tap((response) => this.setAuth(response)));
  }

  registerUser(username: string, email: string, password: string) {
    const user = { username, password, email };
    return this.httpClient
      .post<AuthUser>(`/api/auth/register`, { user })
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
      .post<{ usernameExists: boolean }>(`/api/auth/username-exsists`, {
        username,
      })
      .subscribe({
        next: (response) => {
          if (response.usernameExists) {
            this.usernameExists$.next(true);
          } else {
            this.toasterService.error('Username does not exists!');
            this.usernameExists$.next(false);
          }
        },
      });
  }

  loadUserProfile(): Observable<CurrentUser> {
    return this.httpClient.get<CurrentUser>(`/api/auth/profile`);
  }

  updateProfile(profile: CurrentUser): Observable<CurrentUser> {
    return this.httpClient.put<CurrentUser>(`/api/auth/profile`, {
      profile,
    });
  }
}
