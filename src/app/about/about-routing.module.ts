import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AboutPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AboutRoutingModule {}
