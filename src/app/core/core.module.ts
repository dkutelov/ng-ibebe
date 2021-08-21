import { ToasterModule } from './../toaster/toaster.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotFoundComponent],
  imports: [CommonModule, ToasterModule, RouterModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
