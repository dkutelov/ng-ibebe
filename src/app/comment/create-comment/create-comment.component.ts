import { CommentService } from './../comment.service';
import { ICommentCreate } from './../comment.model';
import { AuthService } from './../../auth/_services/auth.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentUser } from 'src/app/auth/_models/auth.model';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css'],
})
export class CreateCommentComponent implements OnInit {
  form: FormGroup;
  user: CurrentUser | null = null;
  comment: ICommentCreate = {
    text: '',
    author: '',
  };
  isCommentOpen = false;
  @Input() questionOrAnswerAuthor!: string;
  @Input() commentTo!: string;
  @Input() questionOrAnswerId!: string;
  @Output() commentCreated = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commentService: CommentService,
  ) {
    this.form = this.formBuilder.group({
      commentText: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((u) => (this.user = u));
    this.comment.author = this.user!.id;
  }

  toggleComment(state: boolean) {
    this.isCommentOpen = state;
  }

  addComment(): void {
    if (this.form.invalid) return;

    const { commentText } = this.form.value;
    this.comment.text = commentText;

    if (this.commentTo === 'question') {
      const questionId = this.questionOrAnswerId;
      this.commentService
        .createCommentToQuestion(questionId, this.comment)
        .subscribe((c) => {
          this.form.reset();
          this.commentCreated.emit(true);
        });
    } else if (this.commentTo === 'answer') {
      const answerId = this.questionOrAnswerId;
      console.log(answerId);
      this.commentService
        .createCommentToAnswer(answerId, this.comment)
        .subscribe((c) => {
          this.form.reset();
          this.commentCreated.emit(true);
        });
    }
  }
}
