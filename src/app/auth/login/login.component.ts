import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onLoginSubmit(form: NgForm) {
    if (form.invalid) return;

    const { username, password } = form.value;
    this.isLoading = true;
    this.authService.loginUser(username, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

  signInWithGoogle(): void {
    const googleResponse: Observable<SocialUser> = from(
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID),
    );
    this.socialLogin(googleResponse);
  }

  signInWithFacebook(): void {
    const facebookResponse: Observable<SocialUser> = from(
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID),
    );
    this.socialLogin(facebookResponse);
  }

  socialLogin(socialReponse: Observable<SocialUser>): void {
    socialReponse.subscribe((response) => {
      const { authToken, photoUrl, email, provider } = response;
      this.authService
        .socialLogin({ authToken, photoUrl, email, provider })
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
        });
    });
  }
}
