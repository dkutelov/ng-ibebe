import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SameValueDirective } from './same-value.directive';
import { ProfileComponent } from './profile/profile.component';
import { AuthRoutingModule } from './auth-routing.module';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SameValueDirective,
    ProfileComponent,
  ],
  imports: [CommonModule, FormsModule, SocialLoginModule, AuthRoutingModule],
  providers: [
    CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleAuthClientId),
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId'),
          // },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AuthModule {}
