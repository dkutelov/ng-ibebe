import { AnswersListComponent } from './profile/answers-list/answers-list.component';
import { QuestionsListComponent } from './profile/questions-list/questions-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './profile/user/user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      authenticationRequired: false,
      authenticationFailureRedirectUrl: '/',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      authenticationRequired: false,
      authenticationFailureRedirectUrl: '/',
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/login',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/profile/user',
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'questions',
        component: QuestionsListComponent,
      },
      {
        path: 'answers',
        component: AnswersListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
