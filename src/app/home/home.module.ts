import { QuestionModule } from './../question/question.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LinkItemComponent } from './links/link-item/link-item.component';
import { LinkListComponent } from './links/link-list/link-list.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    HomeComponent,
    LinkItemComponent,
    LinkListComponent,
    SearchComponent,
  ],
  imports: [CommonModule, QuestionModule, RouterModule],
})
export class HomeModule {}
