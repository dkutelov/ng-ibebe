import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerListComponent } from './answers/answer-list/answer-list.component';
import { AnswerListItemComponent } from './answers/answer-list-item/answer-list-item.component';
import { AnswerCreateAndEditComponent } from './answer-create-and-edit/answer-create-and-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AnswerListComponent,
    AnswerListItemComponent,
    AnswerCreateAndEditComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [AnswerListComponent, AnswerCreateAndEditComponent],
})
export class AnswerModule {}
