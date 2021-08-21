import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuestionRoutingModule } from './question-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CommentModule } from './../comment/comment.module';
import { AnswerModule } from '../answer/answer.module';

import { QuestionsListComponent } from './questions/questions-list/questions-list.component';
import { QuestionsListItemComponent } from './questions/questions-list-item/questions-list-item.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { TagSelectComponent } from './tags/tag-select/tag-select.component';
import { QuestionCreateAndEditComponent } from './question-create-and-edit/question-create-and-edit.component';
import { QuestionCardDetailsComponent } from './question-card-details/question-card-details.component';
import { QuestionPreviewListComponent } from './questions/question-preview-list/question-preview-list.component';
import { QuestionPreviewListItemComponent } from './questions/question-preview-list-item/question-preview-list-item.component';

@NgModule({
  declarations: [
    QuestionsListComponent,
    QuestionsListItemComponent,
    QuestionPreviewListComponent,
    QuestionPreviewListItemComponent,
    QuestionDetailComponent,
    TagSelectComponent,
    QuestionCreateAndEditComponent,
    QuestionCardDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AnswerModule,
    CommentModule,
    SharedModule,
    QuestionRoutingModule,
  ],
  exports: [QuestionsListComponent, QuestionPreviewListComponent],
})
export class QuestionModule {}
