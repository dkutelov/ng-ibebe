import { IQuestion } from 'src/app/shared/interfaces/question';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { UserService } from 'src/app/core/services/user.service';
import { QuestionService } from './../../../core/services/question.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
})
export class QuestionsListComponent implements OnInit {
  myQuestions: IQuestion[] | null = null;

  constructor(
    private questionService: QuestionService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService
      .loadUserProfile()
      .pipe(
        switchMap((profile) => {
          return this.questionService.loadQuestionsByUserId(profile!._id);
        }),
      )
      .subscribe((questions) => {
        this.myQuestions = questions;
      });
  }

  editQuestion(questionId: string) {}
  deleteQuestion(questionId: string) {}
}
