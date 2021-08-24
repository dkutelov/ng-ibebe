import { ToasterService } from './../../core/services/toaster.service';
import { UserService } from '../../core/services/user.service';
import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
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
export class LoginComponent {
  isLoading: boolean = false;
  nameExists: boolean | null = null;

  constructor(
    public userService: UserService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private toasterService: ToasterService,
  ) {}

  onLoginSubmit(form: NgForm) {
    if (form.invalid) return;

    const { username, password } = form.value;
    this.isLoading = true;
    this.userService.loginUser(username, password).subscribe({
      next: () => {
        this.toasterService.success('You are logged in!'),
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
      const { authToken, email, provider } = response;
      this.userService.socialLogin({ authToken, email, provider }).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
    });
  }

  checkUsernameExists(inputElement: NgModel): void {
    const username = inputElement.control.value;
    if (!username) return;
    this.userService.checkUsernameExists(username);
  }
}
