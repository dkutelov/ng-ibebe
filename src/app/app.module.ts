import { CommentModule } from './comment/comment.module';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';
import { AnswerModule } from './answer/answer.module';

import { authInterceptorProvider } from './core/interceptors/auth.interceptor';
import { errorInterceptorProvider } from './core/interceptors/error.inteceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './_store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    AnswerModule,
    HomeModule,
    CommentModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [authInterceptorProvider, errorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
