import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
