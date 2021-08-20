import { SharedModule } from './../shared/shared.module';
import { CommentService } from '../core/services/comment.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { CommentListItemComponent } from './comments/comment-list-item/comment-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateCommentComponent,
    CommentListComponent,
    CommentListItemComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [CreateCommentComponent, CommentListComponent],
  providers: [CommentService],
})
export class CommentModule {}
