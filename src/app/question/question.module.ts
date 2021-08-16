import { QuestionRoutingModule } from './question-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { QuestionsListComponent } from './questions/questions-list/questions-list.component';
import { QuestionsListItemComponent } from './questions/questions-list-item/questions-list-item.component';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { TagSelectComponent } from './tags/tag-select/tag-select.component';
import { QuestionCreateAndEditComponent } from './questions/question-create-and-edit/question-create-and-edit.component';
import { AnswerModule } from '../answer/answer.module';

@NgModule({
  declarations: [
    HomeComponent,
    QuestionsListComponent,
    QuestionsListItemComponent,
    QuestionDetailComponent,
    TagSelectComponent,
    QuestionCreateAndEditComponent,
  ],
  imports: [CommonModule, FormsModule, AnswerModule, QuestionRoutingModule],
})
export class QuestionModule {}
