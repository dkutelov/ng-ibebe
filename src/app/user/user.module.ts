import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SharedModule } from '../shared/shared.module';
import { QuestionsListComponent } from './profile/questions-list/questions-list.component';
import { AnswersListComponent } from './profile/answers-list/answers-list.component';
import { UserComponent } from './profile/user/user.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SameValueDirective,
    ProfileComponent,
    QuestionsListComponent,
    AnswersListComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    SharedModule,
    AuthRoutingModule,
  ],
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
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookAppId),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class UserModule {}
