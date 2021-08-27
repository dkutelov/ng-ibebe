import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { AnswerModule } from './answer/answer.module';

import { AppComponent } from './app.component';

import { authInterceptorProvider } from './core/interceptors/auth.interceptor';
import { errorInterceptorProvider } from './core/interceptors/error.inteceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './_store';
import { GlobalEffects } from './_store/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserModule,
    AnswerModule,
    HomeModule,
    CommentModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GlobalEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [authInterceptorProvider, errorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
