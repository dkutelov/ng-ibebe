import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';

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
  ) {}

  ngOnInit(): void {}

  onLoginSubmit(form: NgForm) {
    if (form.invalid) return;

    const { username, password } = form.value;
    this.isLoading = true;
    this.authService.loginUser(username, password);
  }

  signInWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        console.log(user);
      });
  }

  signInWithFacebook():void {
    
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }
}
