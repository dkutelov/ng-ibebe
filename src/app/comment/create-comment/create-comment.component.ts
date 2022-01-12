import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CommentService } from '../../core/services/comment.service';
import { UserService } from '../../core/services/user.service';

import { ICommentCreate } from '../../shared/interfaces/comment';
import { CurrentUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css'],
})
export class CreateCommentComponent implements OnInit {
  user: CurrentUser | null = null;
  comment: ICommentCreate = {
    text: '',
    author: '',
  };
  isCommentOpen = false;
  @Input() questionOrAnswerAuthor!: string;
  //TODO: - Create Enum - Question, Answer
  @Input() commentTo!: string;
  @Input() questionOrAnswerId!: string;
  @Output() commentCreated = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((u) => {
      this.user = u;
      this.comment.author = u ? u.id : '';
    });
  }

  toggleComment(state: boolean) {
    this.isCommentOpen = state;
  }

  addComment(commentForm: NgForm) {
    if (commentForm.invalid) return;

    const { commentText } = commentForm.value;
    this.comment.text = commentText;

    if (this.commentTo === 'question') {
      const questionId = this.questionOrAnswerId;
      this.commentService
        .createCommentToQuestion(questionId, this.comment)
        .subscribe((c) => {
          //TODO: Reset template form
          commentForm.resetForm();
          this.commentCreated.emit(true);
        });
    } else if (this.commentTo === 'answer') {
      const answerId = this.questionOrAnswerId;
      this.commentService
        .createCommentToAnswer(answerId, this.comment)
        .subscribe((c) => {
          //TODO: Reset template form
          commentForm.resetForm();
          this.commentCreated.emit(true);
        });
    }
    this.isCommentOpen = false;
  }
}
