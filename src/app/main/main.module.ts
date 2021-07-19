import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { QuestionsListComponent } from './questions/questions-list/questions-list.component';
import { QuestionsListItemComponent } from './questions/questions-list-item/questions-list-item.component';
import { QuestionCreateComponent } from './questions/question-create/question-create.component';

@NgModule({
  declarations: [
    HomeComponent,
    QuestionsListComponent,
    QuestionsListItemComponent,
    QuestionCreateComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class MainModule {}
