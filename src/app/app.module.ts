import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/_interceptors/auth.interceptor';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    MainModule,
    CoreModule,
    AppRoutingModule,
  ],
  // exports: [AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
