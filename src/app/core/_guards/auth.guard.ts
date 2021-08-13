import { AuthService } from './../../auth/_services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/auth/_models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private user: CurrentUser | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.user = currentUser;
      }
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { authenticationRequired, authenticationFailureRedirectUrl } =
      route.data;
    if (
      typeof authenticationRequired === 'boolean' &&
      authenticationRequired === !!this.user
    ) {
      return true;
    }

    let authRedirectUrl = authenticationFailureRedirectUrl;
    if (authenticationRequired) {
      console.log(route.url);

      const loginRedirectUrl = route.url.reduce(
        (acc, s) => `${acc}/${s.path}`,
        '',
      );
      authRedirectUrl += `?redirectUrl=${loginRedirectUrl}`;
    }

    return this.router.parseUrl(authRedirectUrl || '/');
  }
}
