import { NgModule } from '@angular/core';
import { CommentModule } from './../comment/comment.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AnswerRoutingModule } from './answer-routing.module';

import { AnswerListComponent } from './answers/answer-list/answer-list.component';
import { AnswerListItemComponent } from './answers/answer-list-item/answer-list-item.component';
import { AnswerCreate } from './answer-create/answer-create.component';
import { AnswerEditComponent } from './answer-edit/answer-edit.component';

@NgModule({
  declarations: [
    AnswerListComponent,
    AnswerListItemComponent,
    AnswerCreate,
    AnswerEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CommentModule,
    AnswerRoutingModule,
  ],
  exports: [AnswerListComponent, AnswerCreate],
})
export class AnswerModule {}
