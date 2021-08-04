import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SameValueDirective } from './same-value.directive';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SameValueDirective],
  imports: [CommonModule, FormsModule],
  providers: [CookieService],
})
export class AuthModule {}
